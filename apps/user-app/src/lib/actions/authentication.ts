"use server"

import { z } from "zod"
import { signIn } from "../../../auth"
import { signInFormSchema, SignUpFormSchema } from "../validation"
import { client } from "@repo/db/client"

export const SignupUser = (values: z.infer<typeof SignUpFormSchema>) => {
    const fields = SignUpFormSchema.safeParse(values);
    if(fields.success){
        client.user.create({
            data: {
                name: fields.data.name,
                email: fields.data.email, 
        }         
        })
    }
}

export const signinUser = async (values: z.infer<typeof signInFormSchema>) => {
    const validatedFields = signInFormSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    const email = validatedFields.data?.email;
    const pass = validatedFields.data?.password;

    // const isSignIn = await signIn("credentials", {
    //     email, pass
    // })



    // console.log(isSignIn)
    if(validatedFields.success){
    return {success: "Authenticated!"}
    }
}