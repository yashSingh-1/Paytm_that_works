import { Input } from "@/components/ui/input";
import { signIn } from "../../../auth";
import { Button } from "@/components/ui/button";

const SignInPage = () => {

    return (
    <div className="h-screen flex flex-col justify-center items-center">
        <p className="py-4 font-bold text-3xl font-mono">
            PayTm
        </p>
        <form className="space-y-2 w-[300px]">
            <Input type="text" placeholder="Email" className="w-full border-2"/>
            <Input type="text" placeholder="Password" className="w-full border-2"/>
            <Button className="w-full">
                Submit
            </Button>
        </form>
    </div>
    )
}

export default SignInPage;