import mongoose from "mongoose";

export const connectDB= async()=>{
    try {
        const connect = mongoose.connect(process.env.MONGODB_URI);
        console.log("MondoDB connected"); 
    } catch (error) {
        console.log(error);
        
    }
}