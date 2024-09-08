"use client";
import { useState } from "react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useUserStore } from "@/lib/stateHandler";
import { addProduct, uploadImage } from "@/lib/firebaseService";

export default function SellPage() {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productStock, setProductStock] = useState<number | null>(null);
  const [productSize, setProductSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useUserStore((state) => state.user);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in");
      return;
    }

    if (!productImage) {
      console.error("Product image is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = await uploadImage(productImage);
      const productData = {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        type: productType,
        stock: productStock,
        size: productSize,
        imageUrl,
      };

      await addProduct(user.uid, productData);

      console.log("Product successfully added.");

      setProductImage(null);
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductType('');
      setProductStock(null);
      setProductSize('');

    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setIsSubmitting(false);
    }
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
