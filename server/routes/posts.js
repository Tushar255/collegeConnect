import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts); // all posts for home-page
router.get("/:userId/posts", verifyToken, getUserPosts); // only user's posts for profile-page

// UPDATE
router.patch("/:id/like", verifyToken, likePost);

export default router;