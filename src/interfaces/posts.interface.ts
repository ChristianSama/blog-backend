import { Post } from "@prisma/client";

export default interface IPostService {
  getPosts(): Promise<Post[]>;
  getPost(id: Number): Promise<Post | null>;
  createPost(title: string, content: string, authorEmail: string): Promise<Post>;
  editPost(id: Number, title: string, content: string): Promise<Post>;
  deletePost(id: Number): Promise<Post>;
}