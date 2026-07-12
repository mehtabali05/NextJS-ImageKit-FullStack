'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if(res?.error){
                console.error("Response Error: ", res?.error);
            }else{
                router.push("/");
            }
        } catch (error) {
            console.error("Sign in Error: ", error);
        }
    }
    return (
        <div className="flex flex-col gap-4 w-[300px] h-[400px] border rounded-lg p-4 items-center justify-evenly">
            <h1 className="font-bold text-3xl">Login page</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded-lg"
                />

                <input 
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded-lg"
                />
                <button type="submit" className="border p-2 rounded-lg"> Login</button>
            </form>
            <div>
                <p>Don't have an account ? <Link href={"/register"}>Register</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;