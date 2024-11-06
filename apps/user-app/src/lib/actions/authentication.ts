"use server"

import { z } from "zod"
import { signIn } from "../../../auth"
import { signInFormSchema, SignUpFormSchema } from "../validation"
import { client } from "@repo/db/client"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@repo/db/user"
import { error } from "console"
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes"
import { AuthError } from "next-auth"

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

//Login user
export const signinUser = async (values: z.infer<typeof signInFormSchema>) => {
    try {
        const validatedFields = signInFormSchema.safeParse(values);

    
    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    // const user = await getUserByEmail(validatedFields.data.email);

    // if(!user){
    //     return {error: "No user found with this email"};
    // }

    // const userPass = user.password;

    const email = validatedFields.data.email;
    const pass = validatedFields.data.password;
    // const encryptedPass = bcrypt.compare(pass, userPass!)

    // const signinUserByMain = await client.user.findUnique({
    //     where:{
    //         email: validatedFields.data.email,
    //         password: pass
    //     }
    // })

    const isSignIn = await signIn("credentials", {
        email, pass,
        redirectTo: DEFAULT_LOGIN_REDIRECT
    })



    console.log("Using authJs signin fun", isSignIn)
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error : "Invalid Credentials"}
            
                default:
                    return { error: "Something went wrong! "}
            }
        }

        throw error; //It wont rediect you if you dont throw the error back, idk why
    }
}