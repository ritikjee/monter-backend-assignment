import { Request, Response } from "express";

import { verifyToken } from "../lib/token";
import User from "../models/user.model";

export async function getUserDetails(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const user = verifyToken(token);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const userDetails = await User.findOne({ email: user.email }).select(
      "-password"
    );

    if (!userDetails) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function fillUserDetails(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { age, location, work } = req.body;

    if (!age || !location || !work) {
      return res.status(400).send("Please fill all the fields");
    }

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const user = verifyToken(token);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const userDetails = await User.findOne({ email: user.email });

    if (!userDetails) {
      return res.status(404).send("User not found");
    }

    userDetails.age = age;
    userDetails.location = location;
    userDetails.work = work;

    await userDetails.save();

    return res.status(200).send("User details updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
