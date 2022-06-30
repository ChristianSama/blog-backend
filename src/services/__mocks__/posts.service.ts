import posts from "../../../__tests__/mocks/posts.json";

const mock = jest.fn().mockImplementation(() => {
  return {
    getPosts: jest.fn().mockResolvedValue(
      posts.map((post) => {
        return {
          id: post.id,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
          title: post.title,
          content: post.content,
          published: post.published,
          authorId: post.authorId,
        };
      })
    ),
    getPost: jest.fn().mockResolvedValue({
      id: posts[0].id,
      createdAt: new Date(posts[0].createdAt),
      updatedAt: new Date(posts[0].updatedAt),
      title: posts[0].title,
      content: posts[0].content,
      published: posts[0].published,
      authorId: posts[0].authorId,
    }),
    createPost: jest.fn().mockResolvedValue({id: 7}),
    editPost: jest.fn(),
    deletePost: jest.fn(),
  };
});

export default mock;
