import mongoose from "mongoose";

const connectDB  = async (DATABASE_URL: string) => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Database connected ...")
        
    } catch (error) {
        console.log(error);
    }
}



export default connectDB;