import { PrismaClient } from "@prisma/client";
import IUserService from "../interfaces/users.interface";

const prisma = new PrismaClient();

export default class UserService implements IUserService {
  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUser(id: Number) {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { posts: true },
    });
    return user;
  }

  async getUsersAlphabetically() {
    const users = await prisma.user.findMany();

    users.sort((a, b) => a.name.localeCompare(b.name));
    const result = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname.toUpperCase(),
        email: user.email
      };
    });
    return result;
  }

  async getUsersABC() {
    const users = await prisma.user.findMany();
    const result = users.filter((user) => (
      user.name[0].toLowerCase() === "a" || 
      user.name[0].toLowerCase() === "b" || 
      user.name[0].toLowerCase() === "c" 
    ));
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }

  async countUsersABC() {
    const users = await prisma.user.findMany();

    const aUsers = users.filter((user) => (user.name[0].toLowerCase() === "a"));
    const bUsers = users.filter((user) => (user.name[0].toLowerCase() === "b"));
    const cUsers = users.filter((user) => (user.name[0].toLowerCase() === "c"));

    const result = {
      a: aUsers.length,
      b: bUsers.length,
      c: cUsers.length,
    };
    return result;
  }
}
