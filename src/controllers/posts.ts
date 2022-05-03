import { Request, Response } from "express";
import PostService from "../services/posts.service";
import { User } from "@prisma/client";

const postServiceInstance = new PostService();

export default class PostController {
  postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService
  }

  getPosts = async (req: Request, res: Response) => {
    const posts = await postServiceInstance.getPosts();
    res.render("posts/posts", { posts: posts });
  };

  getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await postServiceInstance.getPost(parseInt(id));
    res.render("posts/post", { post: post });
  };

  getCreateForm = (req: Request, res: Response) => {
    res.render("posts/create");
  };

  createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const user = req.user as User;
    const authorEmail = user.email;
    const post = await postServiceInstance.createPost(
      title,
      content,
      authorEmail
    );
    res.redirect("/posts/" + post.id);
  };

  getEditForm = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postServiceInstance.getPost(parseInt(id));
    res.render("posts/edit", {post: post});
  };

  editPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await postServiceInstance.editPost(parseInt(id), title, content);
    res.redirect("/posts/" + id)
  };

  deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postServiceInstance.getPost(parseInt(id));
    const user = req.user as User;
    if (post?.author.id === user.id) {
      await postServiceInstance.deletePost(parseInt(id));
    }
    res.redirect("/posts");
  };
}

