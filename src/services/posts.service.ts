import { PrismaClient } from "@prisma/client";
import IPostService from "../interfaces/posts.interface"

const prisma = new PrismaClient();

export default class PostService implements IPostService {
  async getPosts() {
    const posts = await prisma.post.findMany();
    return posts;
  }

  async getPost(id: Number) {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    return post;
  }

  async createPost(title: string, content: string, authorEmail: string) {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    });
    return post;
  }

  async editPost(id: Number, title: string, content: string) {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
      },
    });
    return post;
  }

  async deletePost(id: Number) {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    return post
  }
}