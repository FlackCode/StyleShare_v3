"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

// Define a type for product data
type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export default function ProductPage() {
  const params = useParams(); 
  const [productData, setProductData] = useState<Product | null>(null);
  const productID = Array.isArray(params.product) ? params.product[0] : params.product;

  useEffect(() => {
    if (productID) {
      const id = parseInt(productID, 10);
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProductData(foundProduct);
      }
    }
  }, [productID, params]);

  // Define the product data
  const products: Product[] = [
    { id: 1, name: "Product A", description: "Description of Product A", price: "$99.99" },
    { id: 2, name: "Product B", description: "Description of Product B", price: "$89.99" },
    { id: 3, name: "Product C", description: "Description of Product C", price: "$79.99" },
    { id: 4, name: "Product D", description: "Description of Product D", price: "$69.99" },
    { id: 5, name: "Product E", description: "Description of Product E", price: "$59.99" },
    { id: 6, name: "Product F", description: "Description of Product F", price: "$49.99" },
  ];

  if (!productData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{productData.name}</h1>
      <p>{productData.description}</p>
      <p>{productData.price}</p>
    </div>
  );
}
