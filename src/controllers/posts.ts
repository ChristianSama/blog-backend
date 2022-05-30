import { NextFunction, Request, Response } from "express";
import IPostService from "../interfaces/posts.interface";
import { User } from "@prisma/client";
import "express-async-errors";
import { nextTick } from "process";

const POST_MIN_LENGTH = 30;

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
    const { id } = req.params;
    if (isNaN(parseInt(id))) throw Error("Not Found");

    const post = await this.postService.getPost(parseInt(id));

    if (!post) throw Error("Not Found");
    res.render("posts/post", { post: post });
  };

  getCreateForm = (req: Request, res: Response) => {
    res.render("posts/create");
  };

  createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    if (!title || title.trim() === "") throw Error("Title Missing");
    if (!content || content.trim().length < POST_MIN_LENGTH) throw Error("Post content is Missing or not long enough");

    const user = req.user as User;
    const authorEmail = user.email;

    const post = await this.postService.createPost(title, content, authorEmail);
    res.redirect("/posts/" + post.id);
  };

  getEditForm = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) throw Error("Not Found");

    const post = await this.postService.getPost(parseInt(id));
    if (!post) throw Error("Not Found");

    const user = req.user as User;
    if (post?.authorId === user.id) {
      res.render("posts/edit", { post: post });
    }
    res.redirect("/posts")
  };

  editPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) throw Error("Not Found");

    const { title, content } = req.body;
    if (!title || title.trim() === "") throw Error("Title Missing");
    if (!content || content.trim().length < POST_MIN_LENGTH) throw Error("Post content is Missing or not long enough");

    const post = await this.postService.getPost(parseInt(id));
    if (!post) throw Error("Not Found");

    const user = req.user as User;
    if (post?.authorId === user.id) {
      await this.postService.editPost(parseInt(id), title, content);
    }
    res.redirect("/posts/" + id);
  };

  deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) throw Error("Not Found");

    const post = await this.postService.getPost(parseInt(id));
    if (!post) throw Error("Not Found");

    const user = req.user as User;
    if (post?.authorId === user.id) {
      await this.postService.deletePost(parseInt(id));
    }
    res.redirect("/posts");
  };
}
