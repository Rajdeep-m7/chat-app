import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`server is running from http://localhost:${PORT}`);
  connectDB();
});
