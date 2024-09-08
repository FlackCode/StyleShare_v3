import Image from "next/image";

type Review = {
    name: string;
    comment: string;
    imagePath: string;
}

export default function ProductReview({name, comment, imagePath}: Review) {

    return (
        <div className="my-2 flex flex-col">
            <div className="flex gap-4 items-center">
                <Image src={imagePath} alt={name} width={32} height={32} className="rounded-full" />
                <h1 className="font-bold">{name}</h1>
            </div>
            <p>{comment}</p>
        </div>
    )
}