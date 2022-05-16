import {capitalizeLastnames, countUsersABC, filterUsersABC, sortAndCapitalizeLastName, sortUsersByName} from "../../src/services/helpers";
import fs from 'fs'
import path from 'path'

let mocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../mocks/users.json")).toString())

describe("sortUsersByName()", () => {
  describe("When passed an array of users", () => {
    it("should return an array of users sorted alphabetically by name", () => {
      expect(sortUsersByName(mocks.users)).toEqual(mocks.usersSortedByName);
    })
  })
  describe("When passed an empty array", () => {
    it("should return an empty array", () => {
      expect(sortUsersByName([])).toEqual([]);
    })
  })
})

describe("capitalizeLastNames()", () => {
  describe("When passed an array of users", () => {
    it("should return an array of users with their lastnames capitalized", () => {
      expect(capitalizeLastnames(mocks.users)).toEqual(mocks.usersCap);
    })
    it("should return an array of users without the password property", () => {
      expect(capitalizeLastnames(mocks.users)[0]).not.toHaveProperty("password");
    })
  })
  describe("When passed an empty array", () => {
    it("should return an empty array", () => {
      expect(capitalizeLastnames([])).toEqual([]);
    })
  })
})

describe("sortAndCapitalizeLastName()", () => {
  describe("When passed an array of users", () => {
    it("should return an array of users sorted alphabetically with lastnames capitalized", () => {
      expect(sortAndCapitalizeLastName(mocks.users)).toEqual(mocks.usersSortedAndCap);
    })
    it("should return an array of users without the password property", () => {
      expect(sortAndCapitalizeLastName(mocks.users)[0]).not.toHaveProperty("password");
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
  describe("When passed an array without users whose name start with 'a', 'b' or 'c'", () => {
    it("should return an empty array", () => {
      expect(filterUsersABC(mocks.usersWithoutABC)).toEqual([]);
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
  describe("When passed and array of users whose name don't start with 'a', 'b', 'c'", () => {
    it("should return an object with 0 on its values", () => {
      expect(countUsersABC(mocks.usersWithoutABC)).toEqual({a: 0, b: 0, c: 0});
    })
  })
  describe("When passed an empty array", () => {
    it("should return an object with 0 on its values", () => {
      expect(countUsersABC([])).toEqual({a: 0, b: 0, c: 0});
    })
  })
})