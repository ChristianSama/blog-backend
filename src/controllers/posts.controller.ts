import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  const post = await prisma.post.findMany();
  res.json(post);
};

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
}

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
}

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const result = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
    },
  });
  res.json(result);
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await prisma.post.delete({
    where: { id: Number(id) },
  });
  res.json(result);
}