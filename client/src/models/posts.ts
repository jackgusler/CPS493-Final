import { api } from "./session";

export interface Post {
  id: number;
  userId: number;
  workoutId: number;
  picture: string;
  description: string;
  date: string;
}

export async function getPosts(): Promise<Post[]> {
  return await api("posts");
}

export function useMakePost() {
  return {
    async makePost(id: number, userId: number, workoutId: number, picture: string, description: string, date: Date): Promise<Post | null> {
      try {
        const post = await api("posts/makepost", { id, userId, workoutId, picture, description, date }, "POST");
        return post;
      } catch (error) {
        console.error("Error calling API:", error);
      }
      return null;
    }
  };
}

export function useDeletePost() {
  return {
    async deletePost(id: number): Promise<Post | null> {
      try {
        const post = await api(`posts/${id}`, { id }, "DELETE");
        return post;
      } catch (error) {
        console.error("Error calling API:", error);
      }
      return null;
    }
  };
}