import Image from "next/image";
import { useCartStore } from "@/lib/stateHandler";

type ProductProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
}

export default function Product({ id, name, description, price, imagePath }: ProductProps) {
    const addtoCart = useCartStore((state) => state.addtoCart);

    const handleAddToCart = () => {
        addtoCart(id);
    }

    return (
        <div className="flex flex-col">
            <div className="relative aspect-square border border-black ">
                <Image src={imagePath} alt={name}fill className="object-cover"/>
            </div>
            <div className="flex justify-between mt-2">
                <h1 className="font-bold truncate">{name}</h1>
            </div>
            <div>
                <p className="text-sm md:text-base truncate">{description}</p>
            </div>
            <div className="flex justify-between">
                <p>${price.toFixed(2)}</p>
                <button onClick={handleAddToCart} className="font-semibold">Add to Cart</button>
            </div>
        </div>
    )
}