import { Request, Response } from "express";
import PostService from "../services/posts.service";
import { User } from "@prisma/client";

const postServiceInstance = new PostService();

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postServiceInstance.getPosts();
  res.render("posts/posts", { posts: posts });
};

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await postServiceInstance.getPost(parseInt(id));
  res.render("posts/post", { post: post });
};

export const getCreateForm = (req: Request, res: Response) => {
  res.render("posts/create");
};

export const createPost = async (req: Request, res: Response) => {
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

export const getEditForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postServiceInstance.getPost(parseInt(id));
  res.render("posts/edit", {post: post});
};

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await postServiceInstance.editPost(parseInt(id), title, content);
  res.redirect("/posts/" + id)
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postServiceInstance.deletePost(parseInt(id));
  res.json(post);
};
