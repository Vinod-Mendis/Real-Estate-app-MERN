import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // install dotenv in the backend because we cannot have .env file in the backend
import useRouter from "./routes/user.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("\x1b[32m%s\x1b[0m", "----- Connected to MongoDB! ----- ");
  })
  .catch((err) => {
    console.log("\x1b[31m%s\x1b[0m", err);
  });

const app = express();

app.listen(3000, () => {
  console.log("\x1b[36m%s\x1b[0m", "----- Server is live on port 3000! ----- ");
});

app.use("/api/user", useRouter);
