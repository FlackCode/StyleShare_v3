"use client";
import Navbar from '@/components/NavBar';
import ProductReview from '@/components/ProductReview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

type Review = {
  name: string;
  comment: string;
  imagePath: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  imagePath: string;
  reviews: Review[];
};

export default function ProductPage() {
  const params = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[] | null>(null);
  const productID = Array.isArray(params.product) ? params.product[0] : params.product;

  useEffect(() => {
    if (productID) {
      const id = parseInt(productID, 10);
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProductData(foundProduct);
        setProductReviews(foundProduct.reviews);
      }
    }
  }, [productID, params]);

  const products: Product[] = [
    {
      id: 1,
      name: "Product A",
      description: "Description of Product A. This is a longer description of the product to test the functionality of the product page.",
      price: "$99.99",
      imagePath: "/placeholder.webp",
      reviews: [
        { name: "John Doe", comment: "Great product, really satisfied with the quality!", imagePath: "/placeholderpfp.jpg" },
        { name: "Jane Smith", comment: "Decent product but shipping was delayed.", imagePath: "/placeholderpfp.jpg" },
      ],
    },
    {
      id: 2,
      name: "Product B",
      description: "Description of Product B. This is a longer description of the product to test the functionality of the product page.",
      price: "$89.99",
      imagePath: "/placeholder.webp",
      reviews: [
        { name: "Alice Johnson", comment: "Good value for the price, would recommend.", imagePath: "/placeholderpfp.jpg" },
        { name: "Mike Lee", comment: "Product met my expectations, no complaints.", imagePath: "/placeholderpfp.jpg" },
      ],
    },
    {
      id: 3,
      name: "Product C",
      description: "Description of Product C. This is a longer description of the product to test the functionality of the product page.",
      price: "$79.99",
      imagePath: "/placeholder.webp",
      reviews: [],
    },
    {
      id: 4,
      name: "Product D",
      description: "Description of Product D. This is a longer description of the product to test the functionality of the product page.",
      price: "$69.99",
      imagePath: "/placeholder.webp",
      reviews: [],
    },
    {
      id: 5,
      name: "Product E",
      description: "Description of Product E. This is a longer description of the product to test the functionality of the product page.",
      price: "$59.99",
      imagePath: "/placeholder.webp",
      reviews: [],
    },
    {
      id: 6,
      name: "Product F",
      description: "Description of Product F. This is a longer description of the product to test the functionality of the product page.",
      price: "$49.99",
      imagePath: "/placeholder.webp",
      reviews: [],
    },
  ];

  if (!productData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <hr />
      <div className="flex flex-col p-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="relative w-full aspect-square border border-black">
            <Image src={productData.imagePath} alt={productData.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-between xl:justify-start py-2">
            <div className="mb-4">
              <h1 className="font-bold text-2xl">{productData.name}</h1>
              <p className="text-xl text-gray-700">{productData.price}</p>
            </div>
            <p className="text-gray-600">{productData.description}</p>
          </div>
        </div>
        <hr className="my-8" />
        <form className="my-2 flex flex-col">
          <h1 className="text-lg font-bold">Write a review about this product:</h1>
          <textarea
            placeholder="Tell us about this product..."
            className="border p-2 h-36 mb-4 resize-none rounded"
          ></textarea>
          <button className="py-2 px-4 border border-black font-bold transition-all duration-300 hover:bg-black hover:text-white rounded">
            Submit Review
          </button>
        </form>
        <div className="flex flex-col mt-8">
          <h1 className="text-lg font-bold mb-4">Other Reviews:</h1>
          {productReviews && productReviews.length > 0 ? (
            productReviews.map((review, index) => (
              <ProductReview
                key={index}
                name={review.name}
                comment={review.comment}
                imagePath={review.imagePath}
              />
            ))
          ) : (
            <p className="text-gray-500">No reviews for this product yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
