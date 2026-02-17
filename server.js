import express from "express"

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose  from "mongoose";
import { connectDB } from "./utils/db.js";
import dotenv from "dotenv"
dotenv.config()
const app= express();
app.use(express.json())
app.use("/user",userRoutes);
app.use("/auth",authRoutes);
    connectDB()
app.listen('3000',()=>{
    console.log(`App is running on http://localhost:3000`);
})