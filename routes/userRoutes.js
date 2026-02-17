import express from "express";
import { User } from "../models/userModel.js";
import { getAllUsers } from "../controllers/userControllers.js";
const router = express.Router();

router.get("/users", getAllUsers);
 

export default router;