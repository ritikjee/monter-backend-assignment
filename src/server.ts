import express, { Express, Request, Response } from "express";

import path from "path";

import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db";
import authRouter from "./routes/auth.route";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api/auth", authRouter);

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
