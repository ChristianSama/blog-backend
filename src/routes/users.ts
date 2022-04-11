import express from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

//Get users
router.get("/", async (req, res) => {
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

export default router;