import { api, getSession } from "./session";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  token?: string;
  workoutsByIds: number[];
}

export function getUsers(): Promise<User[]> {
  return api("users");
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    try{
        const users = await getUsers()
        const user = users.find((user) => user.email === email)
        return user
    }
    catch(error){
        console.error("Error calling API:", error);
    }
}

export function checkIfUserExists(email: string): Promise<boolean> {
    try{
        const user = getUserByEmail(email)
        if(user != undefined){
            return true
        } else {
            return false
        }
    }
    catch(error){
        console.error("Error calling API:", error);
    }
}

export function useUpdateUser() {
  const session = getSession();
  return {
    async updateUser(
      id: number,
      firstName: string,
      lastName: string,
      username: string,
      email: string,
      password: string,
      admin: boolean,
      workoutsByIds: number[]
    ): Promise<User | null> {
      try {
        const user = await api(
          `users/${id}`,
          {
            id,
            firstName,
            lastName,
            username,
            email,
            password,
            admin,
            workoutsByIds,
          },
          "PATCH"
        );
        if (user != undefined) {
          session.user = user;
          return session.user;
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
      return null;
    },
  };
}
