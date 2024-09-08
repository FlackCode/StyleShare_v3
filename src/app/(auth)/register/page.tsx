"use client"

import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/lib/stateHandler";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { register, isLoading, error, user } = useUserStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(username, email, password ,confirmPassword);
    }

    useEffect(() => {
        if (user && !error) {
            router.push("/");
        }
    }, [user, error, router]);

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="h-[10svh]">
                <Link href={"/"} className="flex gap-2 items-center p-4 transition-transform duration-300 hover:scale-105 transform origin-left">
                    <BsArrowLeft />
                    <p className="font-bold">Back to home page</p>
                </Link>
            </div>
            <div className="h-[90svh] flex flex-col justify-between items-center py-4">
                <div>
                    <h1 className="font-bold text-5xl tracking-wide">STYLESHARE</h1>
                </div>
                <form className="flex flex-col gap-1 w-full px-8 md:px-24 xl:max-w-3xl" onSubmit={handleRegister}>
                    <h1 className="font-bold">Register Page</h1>
                    <input type="text" placeholder="Username" className="p-2 border border-black rounded-md"
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="email" placeholder="Email" className="p-2 border border-black rounded-md"
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" className="p-2 border border-black rounded-md"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" className="p-2 border border-black rounded-md"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    
                    <button type="submit" disabled={isLoading}  
                    className="border border-black font-bold py-2 px-4 transition-all duration-300 hover:bg-black hover:text-white">
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex gap-1">
                        <p>Already have an account?</p>
                        <Link href={"/login"} className="underline">Login Here</Link>
                    </div>
                </form>
                <p className="text-gray-400 font-bold">© 2024 STYLESHARE</p>
            </div>
        </div>
    )
}