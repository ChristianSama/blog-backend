import { Request, Response } from "express";
import usersService from "../services/users.service";

const usersServiceInstance = new usersService();

export const getUsers = async (req: Request, res: Response) => {
  const users = await usersServiceInstance.getUsers();
  res.render("users/users", {users: users})
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await usersServiceInstance.getUser(parseInt(id)); 
  res.render("users/user", {user: user})
};

export const operation1 = async (req: Request, res: Response) => {
  const users = await usersServiceInstance.getUsersAlphabetically();
  res.render("users/userList", {users: users});
};

export const operation2 = async (req: Request, res: Response) => {
  const users = await usersServiceInstance.getUsersABC();
  res.render("users/userList", {users: users});
};

export const operation3 = async (req: Request, res: Response) => {
  const userCount = await usersServiceInstance.countUsersABC();
  res.render("users/userCount", {userCount: userCount});
};
