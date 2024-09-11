import Image from "next/image";

export default function CartItem({itemId, itemUrl, itemName, itemQuantity, itemPrice}: any) {
    return (
        <>
        <div key={itemId} className="flex items-center mb-4">
          <Image src={itemUrl} alt={itemName} width={80} height={80} className="object-cover rounded mr-4 aspect-square"/>
          <div className="flex-1">
            <h3 className="font-bold">{itemName}</h3>
            <p>Quantity: {itemQuantity}</p>
            <p className="text-gray-600">${itemPrice.toFixed(2)}</p>
          </div>
        </div>
        </>
    )
}