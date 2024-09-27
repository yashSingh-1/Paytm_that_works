
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { client } from "@repo/db/client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(client),
  providers: [
    credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize: async (credentials) => {
          let user = null;
          
          return user;
        }
    })
  ],
})