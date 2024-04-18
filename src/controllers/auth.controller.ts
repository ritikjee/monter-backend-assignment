import { Request, Response } from "express";

import User from "../models/user.model";
import Otp from "../models/otp.model";

import { generateOTP } from "../lib/generat-otp";
import { sendMail } from "../lib/send-mail";
import { generateToken } from "../lib/token";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    await User.create({ email, password });

    const otp = generateOTP();

    await Otp.create({ email, otp });

    await sendMail(email, otp);

    res.json({ message: "An OTP has been sent to your inbox" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function verify(req: Request, res: Response) {
  const { email, otp } = req.query;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const otpExists: any = await Otp.findOne({ email, otp });

    if (!otpExists) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const currentTime = new Date();

    const otpTime = new Date(otpExists.updatedAt);

    const timeDiff = currentTime.getTime() - otpTime.getTime();

    if (timeDiff > 5 * 60 * 1000) {
      return res.status(400).json({ error: "OTP expired" });
    }

    Promise.all([
      User.findOneAndUpdate({ email }, { __verified: true }),
      Otp.findOneAndDelete({ email }),
    ]);

    res.json({ message: "User verified" });
  } catch (error) {
    return res.status(400).json({ error: "Invalid OTP" });
  }
}

export async function resendOTP(req: Request, res: Response) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const otp = generateOTP();

    await Otp.findOneAndUpdate({ email }, { otp });

    await sendMail(email, otp);

    res.json({ message: "An OTP has been sent to your inbox" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!user.__verified) {
      return res.status(400).json({ error: "User not verified" });
    }

    const token = generateToken({ email });

    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal SErver Error" });
  }
}
