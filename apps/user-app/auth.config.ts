// import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials" 
import bcrypt from "bcryptjs"
import { signInFormSchema } from "@/lib/validation"
import { getUserByEmail } from "@repo/db/user";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInFormSchema.safeParse(credentials);

        if(validatedFields.success){
          const {email, password} = validatedFields.data;

          const user = await getUserByEmail(email);

          if(!user || !user.password){
            return null;
          }

          const doPasswordsMatch = await bcrypt.compare(password, user.password);

          if(doPasswordsMatch){
            return user;
          }

        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig