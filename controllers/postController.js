import { createPostService,getAllPostsService } from "../services/postService.js";

export async function createPost(req,res){
   const {title,content}=req.body;
    if(!title || !content){
       return res.status(400).send("Title and content are required");
    }
    const userId=req.userId;
    try {
      const post = await createPostService(title,content,userId);
  res.status(201).json(post);
    } catch (error) {
      res.status(500).send("Error creating post");
    }
}

export async function getPosts(req,res){
  try {
    const posts = await getAllPostsService();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
}