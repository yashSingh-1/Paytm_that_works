"use server"

import { z } from "zod"
import { signIn } from "../../../auth"
import { signInFormSchema, SignUpFormSchema } from "../validation"
import { client } from "@repo/db/client"
import bcrypt from "bcrypt"

export const SignupUser = async (values: z.infer<typeof SignUpFormSchema>) => {
    const fields = SignUpFormSchema.safeParse(values);

    const email = fields.data?.email;
    const password = fields.data?.password;
    const name = fields.data?.name;
    
    const hashedPass = await bcrypt.hash(password!, 10)


    const user = await client.user.findUnique({
        where: {
            email: fields.data?.email
        }
    })

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

    // const isSignIn = await signIn("credentials", {
    //     email, pass
    // })



    // console.log(isSignIn)
    if(validatedFields.success){
    return {success: "Authenticated!"}
    }
}