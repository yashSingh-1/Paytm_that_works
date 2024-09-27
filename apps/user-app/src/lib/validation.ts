import {z} from "zod";

export const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30)
})

export const SignUpFormSchema = z.object({
    name: z.string({
        invalid_type_error: "Require a name!",
        message: "Enter a name"
    }),
    email: z.string().email(),
    password: z.string().min(8).max(30)
})