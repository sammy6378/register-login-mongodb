import express from 'express'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/User'
import { sign } from 'hono/jwt'
import { Context } from 'hono';

export const register = async (c: Context) => {
    try {
        const data = await c.req.json();

        if (!data) {
            return c.json({ success: false, message: "Invalid request" }, 400);
        }

        const { email, password } = data;

        // Validate email and password
        if (!validator.isEmail(email)) {
            return c.json({ success: false, message: "Invalid email" }, 400);
        }

        if (!validator.isStrongPassword(password)) {
            return c.json({ success: false, message: "Password is too weak" }, 400);
        }

        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return c.json({ success: false, message: "Email is already registered" }, 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await userModel.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email,
            phone: data.phone,
            password: hashedPassword,
        });

        if (!user) {
            return c.json({ success: false, message: "Failed to create user" }, 500);
        }

        return c.json({ success: true, message: "User created successfully" }, 201);
    } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
    }
};



// login
export const Login = async (c: Context) =>{

    try {
  
    const res = await c.req.json();

    if(!res){
        return c.json({ success: false, message: "Data not found" }, 400);
    }

    const { email, password} = res;

    if( email === "" || password === ""){
        return c.json({ success: false, message: "Missing Fields" }, 400);
    }

    // check password match
    const user = await userModel.findOne({email});


    if(!user) {
        return c.json({success: false, message: "Invalid email.Try again"})
    }

    const passwordMatch = await bcrypt.compare(password,user?.password)

    if(!passwordMatch) {
        return c.json({success: false, message: "Invalid password, Try again"})
    }

    // generate token
    const payload = {
        email,
        password,
        username: user.first_name,
        role: user.role,
        id: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 180),
    }

    const secret = process.env.JWT_SECRET as string;

    const token = await sign(payload,secret)

    return c.json({token, role: payload.role, id: payload.id, username: payload.username },200)
       
} catch (error) {
    console.log(error);
   return c.json({success: false, message: "Login error"});
}


}