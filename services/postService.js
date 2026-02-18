import e from "express";
import { Post } from "../models/postModel.js";

export function createPostService(title,content,userId){
    const newPost = new Post({
        title,
        content,
       user: userId
    });
    return newPost.save();  
}
export async function getAllPostsService(page, limit) {

  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "name email");

  return posts;
}

export function getUserPostsService(userId){
    return Post.find({user:userId}).populate("user","name email").sort({createdAt:-1});
}   

export function deletePostService(postId,userId){
    const post = Post.findById(postId);
    if(!post){
        throw new Error("Post not found");
    }   
    if(post.user.toString()!==userId){
        throw new Error("Unauthorized");
    }
    return post.deleteOne();
}

export async function updatePostService(postId, userId, title, content) {

    // 1️⃣ Find post by ID
    const post = await Post.findById(postId);

    if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    // 2️⃣ Ownership check
    if (post.user.toString() !== userId) {
        const error = new Error("Forbidden: You are not the owner");
        error.statusCode = 403;
        throw error;
    }

    // 3️⃣ Update only allowed fields
    if (title) post.title = title;
    if (content) post.content = content;

    // 4️⃣ Save updated document
    await post.save();

    return post;
}
export async function getPostsService(page, limit) {

    const skip = (page - 1) * limit;

    const posts = await Post.find()
        .sort({ createdAt: -1 }) // newest first
        .skip(skip)
        .limit(limit)
        .populate("user", "name email"); // never expose password
const totalPosts = await Post.countDocuments();
const totalPages = Math.ceil(totalPosts / limit);

return {
  page,
  limit,
  totalPages,
  totalPosts,
  data: posts
};

}

