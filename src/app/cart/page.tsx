"use client";
import CartItem from "@/components/CartItem";
import Navbar from "@/components/NavBar";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/stateHandler";

export default function CartPage() {
  const { cart, products, total, updateQuantity, removeFromCart, clearCart, fetchProducts, applyPromoCode } = useCartStore();
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const totalAmount = total;
  const handleApplyPromoCode = () => {
    applyPromoCode(promoCode);
  };
  const handleCheckout = () => {
    alert("Checkout functionality is not yet implemented.");
  };

  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-screen-xl mx-auto">
        <div className="flex-1 border border-gray-300 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          <div className="max-h-[200px] overflow-y-auto">
            {cart.length > 0 ? (
              cart.map((item) => {
                const product = products.find((p) => p.id === item.id);
                return (
                  <CartItem
                    key={item.id}
                    itemId={item.id}
                    itemPrice={product?.price || 0}
                    itemUrl={product?.imageUrl || "/placeholder.webp"}
                    itemName={product?.name || "Unknown Product"}
                    itemQuantity={item.quantity}
                    onUpdateQuantity={(quantity: number) => updateQuantity(item.id, quantity)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                );
              })
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
          <button onClick={clearCart} className="mt-4 text-red-500">
            Clear Cart
          </button>
        </div>
        <div className="w-full md:w-1/3 border border-gray-300 p-4 rounded flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex flex-col gap-2">
            <p className="text-lg">Total: ${totalAmount.toFixed(2)}</p>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code"
              className="border p-2 w-full rounded mb-2"
            />
            <button
              onClick={handleApplyPromoCode}
              className="py-2 px-4 border border-black font-bold transition-all duration-300 hover:bg-black hover:text-white w-full"
            >
              Apply
            </button>
            <button
              onClick={handleCheckout}
              className="py-2 px-4 border border-black font-bold transition-all duration-300 hover:bg-black hover:text-white w-full"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
