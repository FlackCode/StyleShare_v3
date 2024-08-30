import Image from "next/image";
import { BsHeart } from "react-icons/bs";

export default function Product() {
    return (
        <div className="flex flex-col">
            <div className="relative h-48 md:h-60 border border-black ">
                <Image src={'/placeholder.webp'} alt="Placeholder Image" fill className="object-cover"/>
            </div>
            <div className="flex justify-between mt-2">
                <h1 className="font-bold truncate">Item Name</h1>
                <div className="flex gap-2">
                    <button>
                        <BsHeart />
                    </button>
                </div>
            </div>
            <div>
                <p className="text-sm md:text-base truncate">This is a short description of the product, very cool placeholder description.</p>
            </div>
            <div className="flex justify-between">
                <p>$99.99</p>
                <p className="font-semibold">Add to Cart</p>
            </div>
        </div>
    )
}