import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

// app.use(express.json());
app.use(express.urlencoded());

//Get all posts
app.get("/posts", async (req, res) => {
  const post = await prisma.post.findMany();
  res.json(post);
});

//Get specific post
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});

//Create a new post
app.post("/posts", async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(req.body);
});

//Edit a specific post
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const result = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
    },
  });
  res.json(req.body);
});

//Delete specific post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.delete({
    where: { id: Number(id) },
  });
  res.json(req.params.id);
});

//Get users
app.get("/users", async (req, res) => {
  const search = req.query.search as string;

  let filteredUsers = await prisma.user.findMany({
    orderBy: { name: "asc" },
    where: {
      name: {
        startsWith: search,
        mode: 'insensitive', //make filtering case-insensitive
      },
    },
  });
  res.json({
    result: filteredUsers,
    count: filteredUsers.length
  });
});

//Start Server
const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
