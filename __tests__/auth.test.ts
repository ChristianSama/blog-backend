import { session } from "passport";
import supertest from "supertest";
import app from "../src/app";
const request = supertest.agent(app);

describe("POST /auth/login", () => {
  describe("When given a correct email and password", () => {
    it("should login the user and redirect to index with status 201", async () => {
      const body = {
        email: "jperez@gmail.com",
        password: "123",
      };
      const res = await request
        .post("/auth/login")
        .send(body)
      expect(res.statusCode).toEqual(201);
      expect(res.header["location"]).toEqual("/");
      const loggedIn = res.header["set-cookie"].some((cookie: string) => {
        return cookie.substring(0, 8) == "jwtToken";
      })
      expect(loggedIn).toBe(true);
    });
  });
  describe("When given an incorrect email", () => {
    it("should redirect to login page with status 302", async () => {
      const body = {
        email: "nobody@gmail.com",
        password: "123",
      };
      const res = await request
        .post("/auth/login")
        .send(body)
      expect(res.statusCode).toEqual(302);
      expect(res.header["location"]).toEqual("/auth/login");
    })
  })
  describe("When given an incorrect password", () => {
    it("should redirect to login page with status 302", async () => {
      const body = {
        email: "jperez@gmail.com",
        password: "incorrect",
      };
      const res = await request
        .post("/auth/login")
        .send(body)
      expect(res.statusCode).toEqual(302);
      expect(res.header["location"]).toEqual("/auth/login");
    })
  })
});

describe("POST /auth/signup", () => {
  describe("When given valid a name, lastname, email and password", () => {
    it("should register the user and redirect to login page", async () => {
      const body = {
        name: "Ignacio",
        lastname: "Varga",
        email: "ivargas@gmail.com",
        password: "incorrect"
      };
      const res = await request
        .post("/auth/signup")
        .send(body)
      expect(res.statusCode).toEqual(201);
      expect(res.header["location"]).toEqual("/auth/login");
    })
  })
})