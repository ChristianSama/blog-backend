import supertest from "supertest";
import app from "../../src/app";
const request = supertest.agent(app);

describe("POST /auth/login", () => {
  describe("When given a correct email and password", () => {
    it("should login the user and redirect to index with status 201", async () => {
      const body = {
        email: "jperez@gmail.com",
        password: "123",
      };
      const res = await request.post("/auth/login").send(body);
      expect(res.statusCode).toEqual(302);
      expect(res.header["location"]).toEqual("/");
      const loggedIn = res.header["set-cookie"].some((cookie: string) => {
        return cookie.substring(0, 8) == "jwtToken";
      });
      expect(loggedIn).toBe(true);
    });
  });
  describe("When given an incorrect email", () => {
    it("should redirect to login page with status 302", async () => {
      const body = {
        email: "nobody@gmail.com",
        password: "123",
      };
      const res = await request.post("/auth/login").send(body);
      expect(res.statusCode).toEqual(302);
      expect(res.header["location"]).toEqual("/auth/login");
      const loggedIn = res.header["set-cookie"].some((cookie: string) => {
        return cookie.substring(0, 8) == "jwtToken";
      });
      expect(loggedIn).toBe(false);
    });
  });
  describe("When given an incorrect password", () => {
    it("should redirect to login page with status 302", async () => {
      const body = {
        email: "jperez@gmail.com",
        password: "incorrect",
      };
      const res = await request.post("/auth/login").send(body);
      expect(res.statusCode).toEqual(302);
      expect(res.header["location"]).toEqual("/auth/login");
      const loggedIn = res.header["set-cookie"].some((cookie: string) => {
        return cookie.substring(0, 8) == "jwtToken";
      });
      expect(loggedIn).toBe(false);
    });
  });
});

describe("POST /auth/signup", () => {
  describe("When given valid a name, lastname, email and password", () => {
    it("should register the user and the user should be able to login", async () => {
      const body = {
        name: "Ignacio",
        lastname: "Varga",
        email: "ivargas@gmail.com",
        password: "password",
      };
      let res = await request.post("/auth/signup").send(body);
      expect(res.statusCode).toEqual(302);
      expect(res.header["location"]).toEqual("/auth/login");

      res = await request.post("/auth/login").send({email: body.email, password: body.password})
      const loggedIn = res.header["set-cookie"].some((cookie: string) => {
        return cookie.substring(0, 8) == "jwtToken";
      });
      expect(loggedIn).toBe(true);
    });
  });
  describe("When given an existing email", () => {
    it("should redirect to signup page with status 302", async () => {
      const body = {
        name: "Patricio",
        lastname: "Estrella",
        email: "pestrella@gmail.com",
        password: "1234",
      };
      let res = await request.post("/auth/signup").send(body);
      expect(res.statusCode).toEqual(302);
      expect(res.header["location"]).toEqual("/auth/signup");
    });
  });
});
