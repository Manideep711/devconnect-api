import { Post } from "../models/Post.js";

/**
 * Create new post
 */
export const createPostService = async (title, content, userId) => {
  const post = await Post.create({
    title,
    content,
    user: userId,
  });

  return post;
};

/**
 * Get public feed with pagination
 */
export const getAllPostsService = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "name email");

  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);

  return {
    page,
    limit,
    totalPages,
    totalPosts,
    data: posts,
  };
};

/**
 * Get posts of logged-in user
 */
export const getUserPostsService = async (userId) => {
  return await Post.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email");
};

/**
 * Delete post (ownership protected)
 */
export const deletePostService = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (post.user.toString() !== userId.toString()) {
    const error = new Error("Forbidden: You are not the owner");
    error.statusCode = 403;
    throw error;
  }

  await post.deleteOne();

  return true;
};

/**
 * Update post (ownership protected)
 */
export const updatePostService = async (
  postId,
  userId,
  title,
  content
) => {
  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (post.user.toString() !== userId.toString()) {
    const error = new Error("Forbidden: You are not the owner");
    error.statusCode = 403;
    throw error;
  }

  if (title) post.title = title;
  if (content) post.content = content;

  await post.save();

  return post;
};
