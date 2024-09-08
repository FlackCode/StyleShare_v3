"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stateHandler";
import { changeUserInfo, getUserInfo, getUserProducts } from "@/lib/firebaseService";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const { user, logout } = useUserStore();
  const [userInfo, setUserInfo] = useState<any>({ username: "", password: "", confirmPassword: "" });
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.uid) {
        try {
          const info = await getUserInfo(user.uid);
          setUserInfo(info);
        } catch (error) {
          console.error("Error fetching user info: ", error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user?.uid) return;

      try {
        const fetchedUserProducts = await getUserProducts(user.uid);
        setUserProducts(fetchedUserProducts);
      } catch (error) {
        console.error("Error fetching user products: ", error);
      }
    };

    fetchUserProducts();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState: any) => ({
      ...prevState, 
      [name]: value
    }))
  };

  const handleSaveChanges = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      await changeUserInfo(user.uid, {
        username: userInfo.username,
        password: userInfo.password,
        confirmPassword: userInfo.confirmPassword,
      });

      console.log("Updated user information successfully. ");

    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  if (userLoading) return <p>Loading user info...</p>;

  return (
    <div>
        <Navbar />
            <div className="flex flex-col items-center p-4 xl:p-8">
            <div className="w-full max-w-2xl bg-white shadow-md rounded p-4 mb-6">
              <h1 className="text-xl font-bold mb-4">Profile Information</h1>
              <div className="flex flex-col gap-2 mb-4">
                <h1 className="px-1 font-bold">Username</h1>
                <input type="text" name="username" value={userInfo.username} onChange={handleInputChange} placeholder="Name" className="border p-2 rounded w-full"/>
                {/* 
                <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} placeholder="Email" className="border p-2 rounded w-full"/>
                */}
              </div>
              <form onSubmit={handleSaveChanges} className="flex flex-col gap-2 mb-4">
                <h2 className="font-bold text-lg mb-2">Change Password</h2>
                <input type="password" name="password" value={userInfo.password} onChange={handleInputChange} placeholder="New Password" className="border p-2 rounded w-full"/>
                <input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleInputChange} placeholder="Confirm New Password" className="border p-2 rounded w-full"/>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded font-bold hover:bg-gray-800 transition duration-300"
                >
                  Save Changes
                </button>
              </form>
              <button className="w-full py-2 px-4 border border-black rounded font-bold hover:bg-black hover:text-white transition duration-300" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div className="w-full max-w-2xl bg-white shadow-md rounded p-4">
              <h2 className="text-xl font-bold mb-4">Items You're Selling</h2>
              {userProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProducts.map((product) => (
                    <Link key={product.id} href={`/shop/${product.id}`}>
                    <div className="border p-2 rounded flex flex-col items-center cursor-pointer">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-64 object-cover rounded mb-2 aspect-square"
                        />
                        <h3 className="font-bold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                      </div>
                    </Link>
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
