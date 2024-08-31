import Navbar from "@/components/NavBar";
import Product from "@/components/Product";
import Link from "next/link";

export default function Shop() {

    const products = [
        { id: 1, name: "Product A", description: "Description of Product A", price: "$99.99", imagePath: "/placeholder.webp" },
        { id: 2, name: "Product B", description: "Description of Product B", price: "$89.99", imagePath: "/placeholder.webp" },
        { id: 3, name: "Product C", description: "Description of Product C", price: "$79.99", imagePath: "/placeholder.webp" },
        { id: 4, name: "Product D", description: "Description of Product D", price: "$69.99", imagePath: "/placeholder.webp" },
        { id: 5, name: "Product E", description: "Description of Product E", price: "$59.99", imagePath: "/placeholder.webp" },
        { id: 6, name: "Product F", description: "Description of Product F", price: "$49.99", imagePath: "/placeholder.webp" },
      ];

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
                            <Product name={product.name} description={product.description} price={product.price} imagePath={product.imagePath} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}