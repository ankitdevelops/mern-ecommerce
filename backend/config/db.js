import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
