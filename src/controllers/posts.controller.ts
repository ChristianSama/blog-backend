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
