import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running successfully in ${PORT}`);
});
