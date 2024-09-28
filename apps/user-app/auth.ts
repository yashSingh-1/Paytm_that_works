
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { client } from "@repo/db/client"
import GitHub from "next-auth/providers/github"
import authConfig from "./auth.config"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(client),
  session: { strategy: "jwt"},
  ...authConfig
})