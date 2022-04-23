interface User {
  id: number,
  email: string,
  name: string,
  lastname: string,
}

export default interface IUserService {
  getUsers(): Promise<User[]>;
  getUser(id: Number): Promise<User | null>;
}
