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
  try {
    const users = await getUsers();
    const user = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    return user;
  } catch (error) {
    console.error("Error calling API:", error);
  }
}

export async function checkIfUserExistsByEmail(
  email: string
): Promise<boolean> {
  try {
    const user = await getUserByEmail(email);
    if (user != undefined) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error calling API:", error);
    return false;
  }
}

export async function checkIfUserExistsByUsername(
  username: string
): Promise<boolean> {
  try {
    const users = await getUsers();
    const user = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    if (user != undefined) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error calling API:", error);
    return false;
  }
}

export function useUpdateUser() {
  const session = getSession();
  return {
    async updateUser(
      id: number,
      updatedFields: Partial<User>
    ): Promise<User | null> {
      try {
        const user = await api(
          `users/${id}`,
          {
            id,
            ...updatedFields,
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
    async updatePassword(id: number, password: string): Promise<User | null> {
      try {
        const user = await api(
          `users/${id}`,
          {
            id,
            password,
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

export function useDeleteUser() {
  const session = getSession();
  return {
    async deleteUser(id: number): Promise<User | null> {
      try {
        const user = await api(`users/${id}`, {}, "DELETE");
        if (user != undefined) {
          return session.user;
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
      return null;
    },
  };
}
