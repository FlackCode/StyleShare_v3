"use client"

import { useUserStore } from "@/lib/stateHandler";
import Link from "next/link";
import { BsSearch, BsCart4 } from "react-icons/bs";

export default function Navbar() {
  const { user } = useUserStore();

    return (
        <>
            <div className="flex justify-between items-center py-2 px-4 xl:px-16">
              <Link href={'/'} className="font-bold tracking-wider text-lg md:text-xl">STYLESHARE</Link>
              <div className="flex gap-2">
                <Link href={user ? "/sell" : "/login"} className="border border-black font-bold text-xs md:text-base px-1 transition-all duration-300 hover:bg-black hover:text-white
                flex items-center">SELL</Link>
                <Link href={"/shop"} className="border border-black font-bold text-xs md:text-base px-1 transition-all duration-300 hover:bg-black hover:text-white
                flex items-center">SHOP</Link>
                {user ? (
                  <>
                    <Link href={"/profile"} className="border border-black font-bold text-xs md:text-base px-2 py-1 transition-all duration-300 hover:bg-black hover:text-white 
                    flex items-center">PROFILE</Link>
                    <Link href={"/cart"} className="border border-black font-bold text-xs md:text-base px-2 py-1 transition-all duration-300 hover:bg-black hover:text-white 
                  flex items-center">
                    <BsCart4 size={18}/>
                  </Link>
                  </>

                ) : (
                  <>
                    <Link href={"/login"} className="border border-black font-bold text-xs md:text-base px-2 py-1 transition-all duration-300 hover:bg-black hover:text-white 
                    flex items-center">LOGIN</Link>
                    <Link
                      href={"/register"} className="border border-black font-bold text-xs md:text-base px-2 py-1 transition-all duration-300 hover:bg-black hover:text-white 
                      flex items-center">SIGN UP</Link>
                  </>
                )}
              </div>
            </div>
            {
              /* 
              <form className="px-2 py-2 m-2 border border-black flex flex-row items-center xl:mx-16">
                <label htmlFor="search" className="px-2">
                  <BsSearch />
                </label>
                <input type="text" name="search" id="search" placeholder="Search..." 
                  className="flex-1 h-full focus:outline-none border-none"/>
                <button className="border border-black font-bold text-sm md:text-base px-2 py-1 transition-all duration-300 hover:bg-black hover:text-white">
                  GO
                </button>
              </form>
              */
            }
      </>
    )
}