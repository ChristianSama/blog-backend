import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

//GET - /posts
app.get('/posts', async (req, res) => {
  const post = await prisma.post.findMany(); 
  res.json(post);
})

//GET - /post/:id
app.get('/post/:id', async (req, res) => {
  const id = req.params.id

  const post = await prisma.post.findUnique( {
    where: {id: Number(id)},
  }); 

  res.json(post);
})

//POST - /posts
app.post('/posts', async (req, res) => {
  const {title, content, authorEmail} = req.body;

})

//GET - /users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
})

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
