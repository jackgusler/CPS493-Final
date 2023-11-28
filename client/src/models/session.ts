import { reactive } from "vue"
import { useRouter } from "vue-router"
import * as myFetch from "./myFetch"
import { type User, getUserByEmail } from "./users"
import { type Post } from "./posts"

const session = reactive({
  user: null as User | null,
  redirectUrl: null as string | null,
})

export function api(action: string, body?: unknown, method?: string){
  return myFetch.api(`${action}`, body, method)
    .catch(err=> showError(err))
}

export function getSession(){
  return session
}

export function showError(err: any){
  console.error(err)
}

export function useLogin(){
  const router = useRouter()
  return {
    async login(email: string, password: string): Promise<User | null> {
      try {
        session.user = await api("users/login", { email, password })
        if (!session.user) {
          console.log('No user returned from API');
        }
      } catch (error) {
        console.error('Error calling API:', error);
      }
      router.push(session.redirectUrl || "/")
      return session.user
    },
    logout(){
      session.user = null
      router.push("/login")
    }
  }
}