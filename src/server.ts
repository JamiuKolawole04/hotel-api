require("dotenv").config();

import { NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import { set } from "mongoose";

import { connectDB } from "./db/db";

const app = express();
const PORT = process.env.PORT;

// middlewres
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 })
);
app.use(cors());
set("strictQuery", false);

app.get("/", async (_, res: Response) => {
  res.status(200).json({
    sucess: true,
    message: "server on!",
  });
});

const start = async (): Promise<void> => {
  try {
    // await connectDB("mongodb://localhost:27017/hotel-app");
    await connectDB(process.env.MONGO_URI!);

    // await connectDB(process.env.MONGO_URI!);
    console.log("db connected");
    app.listen(PORT, () => console.log(`Server  listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
