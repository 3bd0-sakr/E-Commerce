import { UserResponse } from "@/interfaces"

declare module "next-auth" {
    interface Session {
        user: UserResponse
    }
    interface User {
        user: UserResponse,
        token:string
    }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: UserResponse
    token: string
  }
}
