import express from 'express';
import * as postsController from "../controllers/posts"
//TODO: protect routes with isAuthenticated middleware

const router = express.Router();

//Get all posts
router.get("/", postsController.getPosts);

//Get create post form
router.get("/create", postsController.getCreateForm)

//Get specific post
router.get("/:id", postsController.getPost);

//Create a new post
router.post("/", postsController.createPost);

//Edit a specific post
router.put("/:id", postsController.editPost);

//Delete specific post
router.delete("/:id", postsController.deletePost);

export default router;