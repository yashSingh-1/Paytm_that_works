"use client"
import { signIn } from "../../../auth";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { signInFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signinUser } from "../../../src/lib/actions/authentication" 
import { startTransition, useState } from "react";

const SignInPage = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");


    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async () => {
            console.log("Values: ", values)
        const value = await signinUser(values);
        if(value?.error){
            setError(value.error)
        }
        if(value?.success){
            setSuccess(value.success)
        }
        })
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
                <p className="text-3xl py-4 font-mono font-bold">

                PayTm
                </p>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] space-y-2"
                    // action={
                    //     async (formdata) => {
                    //         await signIn()
                    //     }
                    // }
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} type="email"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        error ? <div className="bg-red-500 p-4 w-[300px]">
                            {/* <ErrorMsg /> */}
                            {error}
                        </div>: null
                    }
                    {
                        success ? <div className="bg-green-400 py-2 px-2 w-[300px] rounded-lg font-mono">
                            {success}
                        </div>: null
                    }
                    <Button type="submit" className="w-[300px]">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignInPage;
