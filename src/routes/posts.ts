import express from 'express';
import * as postsController from "../controllers/posts"

const router = express.Router();

//Get all posts
router.get("/", postsController.getPosts);

//Get create post form
router.get("/create", postsController.getCreateForm)

//Get edit form
router.get("/edit/:id", postsController.getEditForm)

//Edit a specific post
router.put("/:id", postsController.editPost);

//Get specific post
router.get("/:id", postsController.getPost);

//Create a new post
router.post("/", postsController.createPost);

//Delete specific post
router.delete("/:id", postsController.deletePost);

export default router;