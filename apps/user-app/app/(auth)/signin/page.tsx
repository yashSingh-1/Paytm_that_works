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

const SignInPage = () => {

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
        console.log("Values: ", values)
        signinUser(values.email, values.password)
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
                    <Button type="submit" className="w-[300px]">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignInPage;
