import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "./myFetch";
import {
  checkIfUserExistsByEmail,
  checkIfUserExistsByUsername,
  type User,
} from "./users";

const session = reactive({
  user: null as User | null,
  token: null as string | null,
  redirectUrl: null as string | null,
});

export function api(
  action: string,
  body?: unknown,
  method?: string,
  headers?: any
) {
  if (session.token) {
    headers = headers ?? {};
    headers["Authorization"] = `Bearer ${session.token}`;
  }

  return myFetch
    .api(`${action}`, body, method, headers)
    .catch((err) => showError(err));
}

export function getSession() {
  return session;
}

export function showError(err: any) {
  console.error(err);
}

export function useLogin() {
  const router = useRouter();
  return {
    async login(email: string, password: string): Promise<User | null> {
      try {
        const response = await api("users/login", { email, password });
        session.user = response.user;
        session.token = response.token;
        if (!session.user) {
          console.log("No user returned from API");
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
      router.push(session.redirectUrl ?? "/");
      return session.user;
    },
    logout() {
      session.user = null;
      router.push("/login");
    },
  };
}

export function useSignUp() {
  const router = useRouter();
  const { login } = useLogin();
  return {
    async signUp(
      firstName: string,
      lastName: string,
      username: string,
      email: string,
      password: string
    ): Promise<User | null> {
      try {
        const emailExists = await checkIfUserExistsByEmail(email);
        if (emailExists) {
          console.error("Email already in use");
          return null;
        }
        const usernameExists = await checkIfUserExistsByUsername(username);
        if (usernameExists) {
          console.error("Username already in use");
          return null;
        }
        const response = await api("users/signup", {
          firstName,
          lastName,
          username,
          email,
          password,
          admin: false,
          workoutsByIds: [],
        });
        if (response) {
          session.user = response;
          await login(email, password);
        } else {
          console.log("No user returned from API");
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
      return session.user;
    },
    logout() {
      session.user = null;
      router.push("/login");
    },
  };
}
