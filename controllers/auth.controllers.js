import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  //   check existing user
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists!",
      });
    }

    const user = await User.create({
      email,
      password,
      userName,
    });

    if (!user) {
      return res.status(501).json({
        success: false,
        message: "Unable to create User",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;

    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: user.email,
      subject: `Hi ${user.userName}, Verify Your mail`,
      text: `
      <h1>Welcome to our authentication app</h1>
      <p>Please verify your email by clicking the link below</p>
      <a href="${process.env.BASE_URL}/api/v1/verify/${user.verificationToken}">Verify Email</a>
      `,
    };

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);
  } catch (error) {}
};

export { registerUser };
