import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const result = await prisma.user.findMany();
  res.json(result);
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
};

export const operation1 = async (req: Request, res: Response) => {
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
};

export const operation2 = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  users.sort((a, b) => a.name.localeCompare(b.name));
  const result = users.filter((user) => {
    if (user.name[0] === "a" || user.name[0] === "b" || user.name[0] === "c") {
      return true;
    }
    return false;
  });
  res.json(result);
};

export const operation3 = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  const aUsers = users.filter((user) => (user.name[0] === "a" ? true : false));
  const bUsers = users.filter((user) => (user.name[0] === "b" ? true : false));
  const cUsers = users.filter((user) => (user.name[0] === "c" ? true : false));
  const result = {
    a: aUsers.length,
    b: bUsers.length,
    c: cUsers.length,
  };
  res.json(result);
};
