import { Request, Response } from "express";
import UserService from "../services/users.service";
import IUserService from "../interfaces/users.interface";

export default class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.render("users/users", { users: users });
  };

  getUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await this.userService.getUser(parseInt(id));
    res.render("users/user", { user: user });
  };

  //Ajax
  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.render("users/userList", { users: users });
  };

  //Ajax
  getUsersAlphabetically = async (req: Request, res: Response) => {
    const users = await this.userService.getUsersAlphabetically();
    res.render("users/userList", { users: users });
  };

  //Ajax
  getUsersABC = async (req: Request, res: Response) => {
    const users = await this.userService.getUsersABC();
    res.render("users/userList", { users: users });
  };

  //Ajax
  countUsersABC = async (req: Request, res: Response) => {
    const userCount = await this.userService.countUsersABC();
    res.render("users/userCount", { userCount: userCount });
  };
}
