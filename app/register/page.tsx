'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    return <div>
        Register page
    </div>
}

export default RegisterPage;