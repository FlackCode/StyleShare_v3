"use client";
import CartItem from "@/components/CartItem";
import Navbar from "@/components/NavBar";
import { useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Product 1",
      price: 29.99,
      imageUrl: "/placeholder.webp",
      quantity: 1,
    },
    {
      id: "2",
      name: "Product 2",
      price: 49.99,
      imageUrl: "/placeholder.webp",
      quantity: 2,
    },
    {
        id: "2",
        name: "Product 2",
        price: 49.99,
        imageUrl: "/placeholder.webp",
        quantity: 2,
      },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleApplyPromoCode = () => {
    if (promoCode === "SECRET") {
      setDiscount(10);
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    
  };

  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-screen-xl mx-auto">
        <div className="flex-1 border border-gray-300 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          <div className="max-h-[200px] overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem itemId={item.id} itemPrice={item.price} itemUrl={item.imageUrl} itemName={item.name} itemQuantity={item.quantity}/>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3 border border-gray-300 p-4 rounded flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex flex-col gap-2">
              <p className="text-lg">Total: ${(totalAmount - discount).toFixed(2)}</p>
              <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Promo Code" className="border p-2 w-full rounded mb-2"/>
              <button
                    onClick={handleApplyPromoCode}
                    className="py-2 px-4 border border-black font-bold transition-all duration-300 hover:bg-black hover:text-white w-full">Apply</button>
              <button
                onClick={handleCheckout}
                className="py-2 px-4 border border-black font-bold transition-all duration-300 hover:bg-black hover:text-white w-full">Checkout</button>
            </div>
        </div>
      </div>
    </div>
  );
}
