const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

module.exports = connectDb;
