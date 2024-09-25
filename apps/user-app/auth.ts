
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
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