import { Router } from "express";
import {
  login,
  register,
  resendOTP,
  verify,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/generate-otp", resendOTP);

export default authRouter;
