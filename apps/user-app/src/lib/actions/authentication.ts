"use server"

import { z } from "zod"
import { signIn } from "../../../auth"
import { signInFormSchema, SignUpFormSchema } from "../validation"
import { client } from "@repo/db/client"
import bcrypt from "bcrypt"
import { getUserByEmail } from "@repo/db/user"
import { error } from "console"

export const SignupUser = async (values: z.infer<typeof SignUpFormSchema>) => {
    const fields = SignUpFormSchema.safeParse(values);

    const email = fields.data?.email;
    const password = fields.data?.password;
    const name = fields.data?.name;
    
    const hashedPass = await bcrypt.hash(password!, 10)


    // const user = await client.user.findUnique({
    //     where: {
    //         email: fields.data?.email
    //     }
    // })

    const user = await getUserByEmail(email!);

    if(user){
        return {error: "Email already in use!"}
    }
    
    if(!user){
        const userCreated = await client.user.create({
            data: {
                name: name,
                email: email!,
                password: hashedPass
        }         
        })
        if(userCreated){

            return {success: "User Created"}
        }
    }

    // Send verification token email
}

export const signinUser = async (values: z.infer<typeof signInFormSchema>) => {
    const validatedFields = signInFormSchema.safeParse(values);

    
    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    const pass = validatedFields.data.password;
    const encryptedPass = bcrypt.compare(pass, pass)

    const signinUserByMain = await client.user.findUnique({
        where:{
            email: validatedFields.data.email,
            password: pass
        }
    })

    // const isSignIn = await signIn("credentials", {
    //     email, pass
    // })



    // console.log(isSignIn)
    if(signinUserByMain){
        return {success: "Authenticated!"}
    }else {
        return {error: "Something went wrong"}
    }
}