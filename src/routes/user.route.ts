import { Router } from "express";

import {
  getUserDetails,
  fillUserDetails,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/get-user-details", getUserDetails);
userRouter.post("/fill-user-details", fillUserDetails);

export default userRouter;
