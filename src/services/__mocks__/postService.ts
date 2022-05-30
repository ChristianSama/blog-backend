import posts from "../../../__tests__/mocks/posts.json";

export const getPosts = jest.fn(() => {
  return posts.map((post) => {
    Promise.resolve({
      id: post.id,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
    });
  });
});

const mock = jest.fn().mockImplementation(() => {
  return {
    getPosts: getPosts,
    getPost: jest.fn(),
    createPost: jest.fn(),
    editPost: jest.fn(),
    deletePost: jest.fn(),
  };
});

export default mock;
