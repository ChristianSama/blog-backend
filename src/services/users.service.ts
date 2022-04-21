import { PrismaClient } from "@prisma/client";
import IUserService from "../interfaces/users.interface"

const prisma = new PrismaClient();

export default class UserService implements IUserService{
  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUser(id: Number) {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return user;
  }
}