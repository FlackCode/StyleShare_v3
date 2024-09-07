"use client"

import { useUserStore } from "@/lib/stateHandler";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function LoginPage() {
    const { user, login, isLoading, error } = useUserStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        if(!error) {
            router.push('/');
        }
    }

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
                <form className="flex flex-col gap-1 w-full px-8 md:px-24 xl:max-w-3xl" onSubmit={handleLogin}>
                    <h1 className="font-bold">Login Page</h1>
                    <input type="email" placeholder="Email" className="p-2 border border-black rounded-md"
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" className="p-2 border border-black rounded-md"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit" disabled={isLoading}
                    className="border border-black font-bold py-2 px-4 transition-all duration-300 hover:bg-black hover:text-white">
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex gap-1">
                        <p>Don't have an account?</p>
                        <Link href={"/register"} className="underline">Register Here</Link>
                    </div>
                </form>
                <p className="text-gray-400 font-bold">© 2024 STYLESHARE</p>
            </div>
        </div>
    )
}