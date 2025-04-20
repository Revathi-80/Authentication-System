import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const dbConnect = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch(() => {
      console.log("Error in connecting MongoDB");
    });
};

export default dbConnect;
