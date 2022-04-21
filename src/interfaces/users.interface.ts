import {User} from "@prisma/client";

export default interface IUserService {
  getUsers(): Promise<User[]>
}
