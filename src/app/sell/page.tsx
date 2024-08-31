"use client";
import { useState } from "react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function SellPage() {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productStock, setProductStock] = useState<number | null>(null);
  const [productSize, setProductSize] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ productImage, productName, productDescription, productPrice, productType, productStock, productSize });
  };

  return (
    <div>
        <Link href={"/"} className="flex gap-2 items-center p-4 transition-transform duration-300 hover:scale-105 transform origin-left">
            <BsArrowLeft />
            <p className="font-bold">Back to home page</p>
        </Link>
        <div className="p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Sell Your Product</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Product Name:</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" className="border p-2 w-full" required/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description:</label>
              <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Enter product description" className="border p-2 w-full resize-none h-28" required/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price ($):</label>
              <input type="number" step="0.01" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Enter product price" className="border p-2 w-full" required/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Product Type:</label>
              <select value={productType} onChange={(e) => setProductType(e.target.value)} className="border p-2 w-full" required>
                <option value="" disabled>
                  Select type
                </option>
                <option value="headwear">Headwear</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity:</label>
              <input type="number" value={productStock || ""} onChange={(e) => setProductStock(parseInt(e.target.value))} placeholder="Enter stock quantity" className="border p-2 w-full" required/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Available Sizes:</label>
              <input type="text" value={productSize} onChange={(e) => setProductSize(e.target.value)} placeholder="e.g., S, M, L, XL" className="border p-2 w-full"/>
            </div>
            <button type="submit" 
            className="border border-black font-bold py-2 px-4 mt-4 transition-all duration-300 hover:bg-black hover:text-white">Submit Product</button>
          </form>
        </div>
    </div>
  );
}
