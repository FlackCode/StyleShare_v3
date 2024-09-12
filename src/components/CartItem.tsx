import Image from "next/image";

interface CartItemProps {
  itemId: string;
  itemUrl: string;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({
  itemId,
  itemUrl,
  itemName,
  itemQuantity,
  itemPrice,
  onUpdateQuantity,
  onRemove
}: CartItemProps) {
  return (
    <div className="flex items-center mb-4">
      <Image src={itemUrl} alt={itemName} width={80} height={80} className="object-cover rounded mr-4 aspect-square" />
      <div className="flex-1">
        <h3 className="font-bold">{itemName}</h3>
        <p>Quantity: {itemQuantity}</p>
        <p className="text-gray-600">${itemPrice.toFixed(2)}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdateQuantity(itemQuantity + 1)}
            className="py-1 px-2 border border-black rounded"
          >
            +
          </button>
          <button
            onClick={() => onUpdateQuantity(itemQuantity - 1)}
            className="py-1 px-2 border border-black rounded"
            disabled={itemQuantity <= 1}
          >
            -
          </button>
          <button
            onClick={onRemove}
            className="text-red-500 border border-red-500 py-1 px-2 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
