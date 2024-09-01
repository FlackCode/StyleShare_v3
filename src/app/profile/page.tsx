"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/NavBar";

type Product = {
  id: number;
  name: string;
  price: string;
  imagePath: string;
};

export default function ProfilePage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product A", price: "$99.99", imagePath: "/placeholder.webp" },
    { id: 2, name: "Product B", price: "$89.99", imagePath: "/placeholder.webp" },
  ]);

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password changed successfully!");
  };

  return (
    <div>
        <Navbar />
            <div className="flex flex-col items-center p-4 xl:p-8">
            <div className="w-full max-w-2xl bg-white shadow-md rounded p-4 mb-6">
              <h1 className="text-xl font-bold mb-4">Profile Information</h1>
              <div className="flex flex-col gap-2 mb-4">
                <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} placeholder="Name" className="border p-2 rounded w-full"/>
                <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} placeholder="Email" className="border p-2 rounded w-full"/>
              </div>
              <form onSubmit={handlePasswordChange} className="flex flex-col gap-2 mb-4">
                <h2 className="font-bold text-lg mb-2">Change Password</h2>
                <input type="password" name="password" value={userInfo.password} onChange={handleInputChange} placeholder="New Password" className="border p-2 rounded w-full"/>
                <input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleInputChange} placeholder="Confirm New Password" className="border p-2 rounded w-full"/>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded font-bold hover:bg-gray-800 transition duration-300"
                >
                  Change Password
                </button>
              </form>
              <button className="w-full py-2 px-4 border border-black rounded font-bold hover:bg-black hover:text-white transition duration-300">
                Logout
              </button>
            </div>
            <div className="w-full max-w-2xl bg-white shadow-md rounded p-4">
              <h2 className="text-xl font-bold mb-4">Items You're Selling</h2>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border p-2 rounded flex flex-col items-center">
                      <img src={product.imagePath} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-gray-600">{product.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items listed for sale yet.</p>
              )}
            </div>
        </div>
    </div>
  );
}
