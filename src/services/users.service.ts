import { PrismaClient } from "@prisma/client";
import IUserService from "../interfaces/users.interface";
import {
  countUsersABC,
  filterUsersABC,
  sortAndCapitalizeLastName,
} from "./helpers";

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
    return sortAndCapitalizeLastName(users);
  }

  async getUsersABC() {
    const users = await prisma.user.findMany();
    return filterUsersABC(users);
  }

  async countUsersABC() {
    const users = await prisma.user.findMany();
    return countUsersABC(users);
  }
}
