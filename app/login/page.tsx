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
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </form>
            <div>
                <p>Don't have an account ? <Link href={"/register"}>Register</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;