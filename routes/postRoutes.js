import express from "express";  
import authMiddleware from "../middlewares/authMiddleWare.js";
import {createPost,getPosts,deletePost,getUserPosts,updatePost} from "../controllers/postController.js";
const router = express.Router();
router.get("/my",authMiddleware,getUserPosts);
router.get("/",getPosts);
router.post("/",authMiddleware,createPost);
router.put("/:id",authMiddleware,updatePost);
router.delete("/:id",authMiddleware,deletePost); 





export default router;