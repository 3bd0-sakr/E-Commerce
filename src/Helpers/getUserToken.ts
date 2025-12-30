"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getUserToken() {

    const myCookies = await cookies()
    const decodedToken = myCookies.get("next-auth.session-token")?.value || myCookies.get("__Secure-next-auth.session-token")?.value
    const accesstoken = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! })
    return accesstoken?.token
}