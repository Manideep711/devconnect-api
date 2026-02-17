import { createPostService } from "../services/postService.js";

export async function createPost(req,res){
   const {title,content}=req.body;
    if(!title || !content){
        res.status(400).send("Title and content are required");
    }
    const userId=req.userId;
  const post = await createPostService(title,content,userId);
  res.status(201).json(post);
}
