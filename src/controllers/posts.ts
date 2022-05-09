import { Request, Response } from "express";
import IPostService from "../interfaces/posts.interface";
import { User } from "@prisma/client";

export default class PostController {
  private postService: IPostService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  getPosts = async (req: Request, res: Response) => {
    const posts = await this.postService.getPosts();
    res.render("posts/posts", { posts: posts });
  };

  getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await this.postService.getPost(parseInt(id));
    res.render("posts/post", { post: post });
  };

  getCreateForm = (req: Request, res: Response) => {
    res.render("posts/create");
  };

  createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const user = req.user as User;
    const authorEmail = user.email;
    const post = await this.postService.createPost(title, content, authorEmail);
    res.redirect("/posts/" + post.id);
  };

  getEditForm = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await this.postService.getPost(parseInt(id));
    const user = req.user as User;
    if (post?.authorId === user.id) {
      res.render("posts/edit", { post: post });
    }
    res.redirect("/posts")
  };

  editPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await this.postService.getPost(parseInt(id));
    const user = req.user as User;
    if (post?.authorId === user.id) {
      await this.postService.editPost(parseInt(id), title, content);
    }
    res.redirect("/posts/" + id);
  };

  deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await this.postService.getPost(parseInt(id));
    const user = req.user as User;
    if (post?.authorId === user.id) {
      await this.postService.deletePost(parseInt(id));
    }
    res.redirect("/posts");
  };
}
