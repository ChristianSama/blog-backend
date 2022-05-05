import {countUsersABC, filterUsersABC, sortAndCapitalizeLastName} from "../src/services/helpers";
import fs from 'fs'
import path from 'path'

let mocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./mocks/users.json")).toString())

describe("sortAndCapitalizeLastName()", () => {
  describe("When passed an array of users", () => {
    it("should return an array of users sorted alphabetically and with its lastnames capitalized", () => {
      expect(sortAndCapitalizeLastName(mocks.users)).toEqual(mocks.usersSortedAndCap);
    })
  })
  describe("When passed an empty array", () => {
    it("should return an empty array", () => {
      expect(sortAndCapitalizeLastName([])).toEqual([]);
    })
  })
})

describe("filterUsersABC", () => {
  describe("When passed an array of users", () => {
    it("should return an array of users whose name start with 'a', 'b' and 'c'", () => {
      expect(filterUsersABC(mocks.users)).toEqual(mocks.usersABC);
    })
  })
  describe("When passed an empty array", () => {
    it("should return an empty array", () => {
      expect(filterUsersABC([])).toEqual([]);
    })
  })
})

describe("countUsersABC", () => {
  describe("When passed an array of users", () => {
    it("should return an object with the quantities of users whose name start with 'a', 'b' and 'c' respectively", () => {
      expect(countUsersABC(mocks.users)).toEqual(mocks.countABC);
    })
  })
  describe("When passed an empty array", () => {
    it("should return an object with 0 on its values", () => {
      expect(countUsersABC([])).toEqual({a: 0, b: 0, c: 0});
    })
  })
})