'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Loading, error, debouce we can handle here.
        e.preventDefault();

        try {
            if(password !== confirmPassword){
                alert("Password does not match");
                return;
            }

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await res.json();

            if(!data.ok){
                throw new Error(data.error || "Registration failed");
            }

            console.log("Data", data);
            router.push("/login");
        } catch (error) {
            return console.error("Registeration error: ", error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col border p-4 rounded-lg w-[300px] h-[400] items-center justify-evenly">
                <h1 className="font-bold text-3xl">Regiter Form</h1>
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <input
                        type= "email"    
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-lg"
                    />

                    <input
                        type= "password"    
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-lg"
                    />

                    <input
                        type= "password"    
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-lg"
                    />

                    <button type="submit" 
                        className="border p-2 rounded-lg"
                    >Register</button>
                </form>
                <div>
                    <p>Already have an account ? 
                        <Link href={"/login"}
                            className="underline text-blue-500 pl-2"
                        >Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;