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
        <div>
            <h1>Regiter Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type= "email"    
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type= "password"    
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type= "password"    
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" >Register</button>
            </form>
            <div>
                <p>Already have an account ? <Link href={"/login"}>Log in</Link></p>
            </div>
        </div>
    );
}

export default RegisterPage;