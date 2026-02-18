import express from "express";
import { User } from "../models/User.js";
import { getAllUsers } from "../controllers/userControllers.js";
const router = express.Router();

router.get("/users", getAllUsers);
 

export default router;