import express from "express";  
import authMiddleware from "../middlewares/authMiddleWare.js";
import {createPost,getPosts} from "../controllers/postController.js";
const router = express.Router();
router.get("/",getPosts);
router.post("/",authMiddleware,createPost);





export default router;