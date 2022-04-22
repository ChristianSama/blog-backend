import express from 'express';
import * as postsController from "../controllers/posts"

const router = express.Router();

//Get all posts
router.get("/", postsController.getPosts);

//Get specific post
router.get("/:id", postsController.getPost);

//Create a new post
router.post("/", postsController.createPost);

//Edit a specific post
router.put("/:id", postsController.editPost);

//Delete specific post
router.delete("/:id", postsController.deletePost);

export default router;