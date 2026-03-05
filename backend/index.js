import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server is running from http://localhost:${PORT}`);
  connectDB();
});
