import express from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

//Get all posts
router.get("/", async (req, res) => {
  const post = await prisma.post.findMany();
  res.json(post);
});

//Get specific post
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});

//Create a new post
router.post("/", async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
});

//Edit a specific post
router.put("/:id", async (req, res) => {
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
});

//Delete specific post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.delete({
    where: { id: Number(id) },
  });
  res.json(result);
});

export default router;