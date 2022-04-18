import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

//Get users
router.get("/", async (req, res) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

//Get specific user
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
});

//Order Alphabetically by name. Show last name in capital letters
router.get("/operation1", async (req, res) => {
  const users = await prisma.user.findMany();

  users.sort((a, b) => a.name.localeCompare(b.name));
  const result = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname.toUpperCase(),
    };
  });
  res.json(result);
});

//Show the users whose name start with "a", "b" and "c"
router.get("/operation2", async (req, res) => {
  const users = await prisma.user.findMany();
  users.sort((a, b) => a.name.localeCompare(b.name));
  const result = users.filter((user) => {
    if (user.name[0] === "a" || user.name[0] === "b" || user.name[0] === "c") {
      return true;
    }
    return false;
  });
  res.json(result);
});

//Show how many users have names that start with "a", "b" and "c" for each one
router.get("/operation3", async (req, res) => {
  const users = await prisma.user.findMany();
  const aUsers = users.filter(user => user.name[0] === "a" ? true : false)
  const bUsers = users.filter(user => user.name[0] === "b" ? true : false)
  const cUsers = users.filter(user => user.name[0] === "c" ? true : false)
  const result = {
    a: aUsers.length,
    b: bUsers.length,
    c: cUsers.length
  }
  res.json(result);
})

export default router;
