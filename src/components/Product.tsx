import Image from "next/image";
import { BsHeart } from "react-icons/bs";

type ProductProps = {
    name: string;
    description: string;
    price: string;
    imagePath: string;
}

export default function Product({ name, description, price, imagePath }: ProductProps) {
    return (
        <div className="flex flex-col">
            <div className="relative h-48 md:h-60 border border-black ">
                <Image src={imagePath} alt={name}fill className="object-cover"/>
            </div>
            <div className="flex justify-between mt-2">
                <h1 className="font-bold truncate">{name}</h1>
                <div className="flex gap-2">
                    <button>
                        <BsHeart />
                    </button>
                </div>
            </div>
            <div>
                <p className="text-sm md:text-base truncate">{description}</p>
            </div>
            <div className="flex justify-between">
                <p>{price}</p>
                <p className="font-semibold">Add to Cart</p>
            </div>
        </div>
    )
}