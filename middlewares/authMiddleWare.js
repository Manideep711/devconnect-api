import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

/**
 * Protect routes - verifies JWT token
 */
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists and starts with Bearer
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Not authorized, no token provided");
      error.statusCode = 401;
      throw error;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    next();

  } catch (error) {
    error.statusCode = error.statusCode || 401;
    next(error);
  }
};

export default authMiddleware;
