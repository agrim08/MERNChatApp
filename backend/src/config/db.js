import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to Database successfully`);
  } catch (error) {
    console.log(`Failed to connect to Database, error: ${error}`);
  }
};

export default connectDb;
