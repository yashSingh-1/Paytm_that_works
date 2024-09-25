"use server"

import { signIn } from "../../../auth"

export const signinUser = async (email: string, pass: string) => {
    const isSignIn = await signIn("credentials", {
        email, pass
    })

    console.log(isSignIn)
}