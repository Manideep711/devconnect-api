import {
  createPostService,
  getAllPostsService,
  getUserPostsService,
  updatePostService,
  deletePostService,
} from "../services/postService.js";

/**
 * Create new post
 */
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      const error = new Error("Title and content are required");
      error.statusCode = 400;
      throw error;
    }

    const post = await createPostService(
      title,
      content,
      req.user._id // updated from req.userId
    );

    res.status(201).json({
      success: true,
      data: post,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get logged-in user's posts
 */
export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await getUserPostsService(req.user._id);

    res.status(200).json({
      success: true,
      data: posts,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Delete post (ownership protected)
 */
export const deletePost = async (req, res, next) => {
  try {
    await deletePostService(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Update post (ownership protected)
 */
export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const post = await updatePostService(
      req.params.id,
      req.user._id,
      title,
      content
    );

    res.status(200).json({
      success: true,
      data: post,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get public feed with pagination
 */
export const getPosts = async (req, res, next) => {
  try {
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const posts = await getAllPostsService(page, limit);

    res.status(200).json({
      success: true,
      data: posts,
    });

  } catch (error) {
    next(error);
  }
};
