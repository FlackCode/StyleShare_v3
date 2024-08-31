import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function LoginPage() {
    return (
        <div className="flex flex-col">
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
                <form className="flex flex-col gap-1 w-full px-8 md:px-24 xl:max-w-3xl">
                    <h1 className="font-bold">Login Page</h1>
                    <input type="email" placeholder="Email" className="p-2 border border-black rounded-md"/>
                    <input type="password" placeholder="Password" className="p-2 border border-black rounded-md"/>
                    <button type="submit" 
                    className="border border-black font-bold py-2 px-4 transition-all duration-300 hover:bg-black hover:text-white">LOGIN</button>
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