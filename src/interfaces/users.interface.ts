import { User } from "@prisma/client";

export default interface IUserService {
  getUsers(): Promise<User[]>;
  getUser(id: Number): Promise<User | null>;
}
