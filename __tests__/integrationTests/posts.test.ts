import supertest from "supertest";
import app from "../../src/app";
const request = supertest.agent(app);

let cookies: any;

beforeAll(async () => {
  const body = {
    email: "jperez@gmail.com",
    password: "123",
  };
  const res = await request.post("/auth/login").send(body);
  cookies = res.headers["set-cookie"];
  cookies = cookies.map((cookie: string) => cookie.split(";")[0]).join(";");
});

describe("GET /posts", () => {
  describe("For authenticated users", () => {
    it("should return status code 200 and render the view", async () => {
      const res = await request.get("/posts").set("Cookie", cookies);
      expect(res.statusCode).toEqual(200);
      expect(res.headers["content-type"]).toEqual("text/html; charset=utf-8");
    });
  });
  describe("For unauthenticated users", () => {
    it("should return status code 401", async () => {
      const res = await request.get("/posts");
      expect(res.statusCode).toEqual(401);
    });
  });
});

describe("GET /posts/:id", () => {
  describe("For authenticated users", () => {
    describe("When provided a valid post id", () => {
      it("should return status code 200 and render the view", async () => {
        const res = await request.get("/posts/1").set("Cookie", cookies);
        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toEqual("text/html; charset=utf-8");
      });
    });
  });
  describe("For unauthenticated users", () => {
    it("should return status code 401", async () => {
      const res = await request.get("/posts/1");
      expect(res.statusCode).toEqual(401);
    });
  });
});

describe("POST /posts", () => {
  describe("For authenticated users", () => {
    it("should create the post and redirect to the post view", async () => {
      const body = {
        title: "New Post Title",
        content: "Post content",
      };
      let res = await request.post("/posts").send(body).set("Cookie", cookies);
      expect(res.statusCode).toEqual(302);
      expect(res.text).toEqual("Found. Redirecting to /posts/4");

      res = await request
        .get("/posts/4")
        .set("Cookie", cookies);
      expect(res.statusCode).toEqual(200);
    });
  });
  describe("For unauthenticated users", () => {
    it("should return status code 401", async () => {
      const res = await request.post("/posts");
      expect(res.statusCode).toEqual(401);
    });
  });
});

describe("PUT /posts/:id", () => {
  describe("For authenticated users", () => {
    it("should update the post", async () => {
      const body = {
        title: "Edited Post Title",
        content: "Post content",
      };
      const res = await request
        .put("/posts/4")
        .send(body)
        .set("Cookie", cookies);
      expect(res.statusCode).toEqual(302);
      expect(res.text).toEqual("Found. Redirecting to /posts/4");
    });
  });
  describe("For unauthenticated users", () => {
    it("should return status code 401", async () => {
      const body = {
        title: "Edited Post Title",
        content: "Post content",
      };
      const res = await request.put("/posts/4").send(body);
      expect(res.statusCode).toEqual(401);
    });
  });
});
