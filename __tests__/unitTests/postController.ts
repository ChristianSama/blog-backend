jest.mock("../../src/services/posts.service");

import { Request, Response } from "express";
import PostController from "../../src/controllers/posts";
import PostService from "../../src/services/posts.service";

const postService = new PostService();

const postController = new PostController(postService);

describe("getPosts()", () => {
  it("should retrieve all posts and render posts view", async () => {
    const req = {} as Request;
    const res = {
      render: jest.fn(),
    } as unknown as Response;

    await postController.getPosts(req, res);

    expect(postService.getPosts).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith("posts/posts", expect.anything());
  });
});

describe("getPost()", () => {
  it("should retrieve a specific post and render the post view", async () => {
    const req = { params: { id: 7 } } as unknown as Request;
    const res = {
      render: jest.fn(),
    } as unknown as Response;

    await postController.getPost(req, res);
    expect(res.render).toHaveBeenCalledWith("posts/post", expect.anything());
  });
  describe("when the id is not a number", () => {
    it("should Throw error", async () => {
      const req = { params: { id: "asdf" } } as unknown as Request;
      const res = {} as unknown as Response;

      await expect(postController.getPost(req, res)).rejects.toThrow(
        "Not Found"
      );
    });
  });
});

describe("createPost()", () => {
  it("should create a post and redirect to the post view", async () => {
    const req = {
      user: {
        id: 1,
        email: "c.tentaculos@gmail.com",
        password:
          "$argon2i$v=19$m=4096,t=3,p=1$zDRs7Rkq79OgcAac+ZFRiQ$cDIS9SLLnrUGtj78Coih4taascAiMNDJxhDkVY22kVE",
        name: "Calamardo",
        lastname: "Tentaculos",
      },
      body: {
        title: "test title",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat elit nec tristique suscipit. Aenean sit amet eros ipsum. Integer placerat placerat laoreet. Etiam ut orci eu eros maximus commodo eu eget diam. Ut at urna vitae nulla hendrerit vestibulum. Curabitur malesuada tempus ornare. Praesent sit amet sagittis velit, quis egestas orci. Etiam quis nisl ac massa dictum facilisis sit amet vitae lectus. Mauris eu rhoncus erat. Pellentesque varius, ligula vitae blandit sodales, tellus leo consequat est, a mattis erat urna eu elit. Cras turpis mauris, molestie vel nisl et, euismod fringilla erat. Vivamus id dolor libero.",
      },
    } as unknown as Request;

    const res = {
      redirect: jest.fn(),
    } as unknown as Response;

    await postController.createPost(req, res);
    expect(res.redirect).toHaveBeenCalledWith("/posts/7");
  });

  describe("when title is not given", () => {
    it("should throw an error", async () => {
      const req = { body: { content: "test content" } } as unknown as Request;
      const res = {} as unknown as Response;
      await expect(postController.createPost(req, res)).rejects.toThrow(
        "Title Missing"
      );
    });
  });

  describe("when content is smaller than min length or missing", () => {
    it("should throw an error", async () => {
      const req = { body: { title: "test title" } } as unknown as Request;
      const res = {} as unknown as Response;
      await expect(postController.createPost(req, res)).rejects.toThrow(
        "Post content is Missing or not long enough"
      );
    });
  });
});


describe("editPost()", () => {
  describe("if the post belongs to the logged user", () => {
    it("should edit the post and redirect to the post view", async () => {
      const req = {
        params: { id: 1 },
        user: {
          id: 1,
          email: "c.tentaculos@gmail.com",
          name: "Calamardo",
          lastname: "Tentaculos",
        },
        body: {
          title: "Test Title",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat elit nec tristique suscipit. Aenean sit amet eros ipsum. Integer placerat placerat laoreet. Etiam ut orci eu eros maximus commodo eu eget diam. Ut at urna vitae nulla hendrerit vestibulum. Curabitur malesuada tempus ornare. Praesent sit amet sagittis velit, quis egestas orci. Etiam quis nisl ac massa dictum facilisis sit amet vitae lectus. Mauris eu rhoncus erat. Pellentesque varius, ligula vitae blandit sodales, tellus leo consequat est, a mattis erat urna eu elit. Cras turpis mauris, molestie vel nisl et, euismod fringilla erat. Vivamus id dolor libero.",
        },
      } as unknown as Request;

      const res = {
        redirect: jest.fn()
      } as unknown as Response;

      await postController.editPost(req, res)
      expect(postService.editPost).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalled();
    });
  });
  describe("if the given id is NaN", () => {
    it("should throw error - Not Found", async () => {
      const req = { params: { id: "asdf" } } as unknown as Request;
      const res = {} as unknown as Response;

      await expect(postController.editPost(req, res)).rejects.toThrow(
        "Not Found"
      );
    })
  })
  // describe("if the given id is ")
});

describe("getEditForm()", () => {
  describe("if the post belongs to the user", () => {
    it("should render the edit page for that post", async () => {
      const req = {
        params: { id: 1 },
        user: {
          id: 1,
          email: "c.tentaculos@gmail.com",
          name: "Calamardo",
          lastname: "Tentaculos",
        },
      } as unknown as Request;
      const res = {
        render: jest.fn(),
        redirect: jest.fn(),
      } as unknown as Response;

      await postController.getEditForm(req, res);
      expect(res.render).toHaveBeenCalledWith("posts/edit", expect.anything());
    });
  });
  describe("if the post doesn't belong to the user", () => {
    it("should redirect to /posts", async () => {
      const req = {
        params: { id: 1 },
        user: {
          id: 4,
          email: "p.estrella@gmail.com",
          name: "Patricio",
          lastname: "Estrella",
        },
      } as unknown as Request;
      const res = {
        render: jest.fn(),
        redirect: jest.fn(),
      } as unknown as Response;

      await postController.getEditForm(req, res);
      expect(res.redirect).toHaveBeenCalledWith("/posts");
    });
  });
  describe("if id is not a number", () => {
    it("should throw error Not Found", async () => {
      const req = { params: { id: "asdf" } } as unknown as Request;
      const res = {} as unknown as Response;

      await expect(postController.getEditForm(req, res)).rejects.toThrow(
        "Not Found"
      );
    });
  });
  describe("if post with given id does not exist", () => {
    it("should throw error Not Found", async () => {
      postService.getPost = jest.fn().mockResolvedValueOnce(null);

      const req = { params: { id: "999" } } as unknown as Request;
      const res = {} as unknown as Response;

      await expect(postController.getEditForm(req, res)).rejects.toThrow(
        "Not Found"
      );
    })
  })
});