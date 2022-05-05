import IUserService from "../../src/interfaces/users.interface";
import fs from 'fs';
import path from 'path'

let mocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./users.json")).toString())

export default class UserServiceMock implements IUserService {
  async getUsers() {
    return mocks.users;
  }
  async getUser(id: Number) {
    return mocks.users[0];
  }
  async getUsersAlphabetically() {
    return mocks.usersSortedAndCap;
  }
  async getUsersABC() {
    return mocks.usersABC;
  }
  async countUsersABC() {
    return mocks.countABC;
  }
    
}