const mongoose = require("mongoose");
require("dotenv").config();

const env = process.env;


export const connectDb = async () => {
    try{
        await mongoose.connect(env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
}