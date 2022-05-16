import IPostService from "../../src/interfaces/posts.interface";
import posts from "../mocks/posts.json"

export default class PostService implements IPostService {
  async getPosts() {
    return posts.map((post) => {
      return {
        id: post.id,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        title: post.title,
        content: post.content,
        published: post.published,
        authorId: post.authorId
      }
    });
  }

  async getPost(id: Number) {
    const post = {
      id: posts[0].id,
      createdAt: new Date(posts[0].createdAt),
      updatedAt: new Date(posts[0].updatedAt),
      title: posts[0].title,
      content: posts[0].content,
      published: posts[0].published,
      authorId: posts[0].authorId
    }
    return post;
  }

  async createPost(title: string, content: string, authorEmail: string) {
    const post = {
      id: posts[0].id,
      createdAt: new Date(posts[0].createdAt),
      updatedAt: new Date(posts[0].updatedAt),
      title: posts[0].title,
      content: posts[0].content,
      published: posts[0].published,
      authorId: posts[0].authorId
    }
    return post;
  }

  async editPost(id: Number, title: string, content: string) {
    const post = {
      id: posts[0].id,
      createdAt: new Date(posts[0].createdAt),
      updatedAt: new Date(posts[0].updatedAt),
      title: posts[0].title,
      content: posts[0].content,
      published: posts[0].published,
      authorId: posts[0].authorId
    }
    return post;
  }

  async deletePost(id: Number) {
    const post = {
      id: posts[0].id,
      createdAt: new Date(posts[0].createdAt),
      updatedAt: new Date(posts[0].updatedAt),
      title: posts[0].title,
      content: posts[0].content,
      published: posts[0].published,
      authorId: posts[0].authorId
    }
    return post;
  }
}