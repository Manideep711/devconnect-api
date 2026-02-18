import { createPostService,getAllPostsService,getUserPostsService,updatePostService } from "../services/postService.js";
import { getPostsService } from "../services/postService.js";
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
export async function getUserPosts(req,res){
  const userId=req.userId;
  try {    const posts = await getUserPostsService(userId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
}
export async function deletePost(req,res){
  const postId=req.params.id;
  const userId=req.userId;
  try {
    await deletePostService(postId,userId);
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  } 
}
export async function updatePost(req,res) {
  
  const postid=req.params.id;
  const userid=req.userId;
  const{title,content}=req.body;
  try {
   const post= await updatePostService(postid,userid,title,content);
      res.status(200).json(post);
  } catch (error) {
   res.status(error.statusCode || 500).json({ message: error.message })

  }
}
export async function getPosts(req, res) {
    try {
        // Extract query params
        let { page = 1, limit = 5 } = req.query;

        // Convert to numbers
        page = parseInt(page);
        limit = parseInt(limit);

        const posts = await getPostsService(page, limit);

        res.status(200).json(posts);

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}
