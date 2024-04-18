import express, { Express } from "express";

import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./lib/db";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

(async () => {
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log("Listening on port " + PORT));
    })
    .catch((err: any) => {
      console.log(err.message);
      process.exit(1);
    });
})();
