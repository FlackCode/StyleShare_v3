"use client"
import Navbar from "@/components/NavBar";
import Product from "@/components/Product";
import { getAllProducts } from "@/lib/firebaseService";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
}

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getAllProducts();
            setProducts(fetchedProducts);
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <hr />
            <div className="px-2 md:px-4 xl:px-16 py-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg md:text-xl">Browsing {products.length} Products</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
                    {products.map(product => (
                        <Link key={product.id} href={`/shop/${product.id}`}>
                            <Product id={product.id} name={product.name} description={product.description} price={(product.price)} imagePath={product.imageUrl} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}