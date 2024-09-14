import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !!`);
    }
    catch (error){
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;