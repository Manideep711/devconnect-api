import express from "express";
import { User } from "../models/userModel.js";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register",registerUser)  

export default router;