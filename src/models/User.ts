import mongoose from "mongoose";


// user schema
const userRegister = new mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true, minlength:10},
    password:{ 
        type: String, 
        minlength: 8,
        required: true},
        role: { 
            type: String, 
            enum: ['admin', 'user'], 
            default: 'user' 
        },
    createdAt: {type: Date, default: Date.now()}
})


// update user
const updateUser = async(id:string) => {
    try {
        const res = await userModel.updateOne({_id:id}, {email : "johndoe@gmail.com"})
        console.log("data updated successfully", res);
    } catch (error) {
        console.log(error);
    }
}


// create model
const userModel = mongoose.model("user", userRegister);


// export
export default userModel;