"use client";

import Navbar from '@/components/NavBar';
import ProductReview from '@/components/ProductReview';
import { addReview, fetchProductReviewsWithUserInfo, getAllProducts, getUserInfo } from '@/lib/firebaseService';
import { useUserStore } from '@/lib/stateHandler';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

type Review = {
  userId: string;
  comment: string;
  imagePath: string;
  username?: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  reviews: Review[];
};

export default function ProductPage() {
  const { user } = useUserStore();
  const params = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewComment, setReviewComment] = useState<string>('');
  const productID = Array.isArray(params.product) ? params.product[0] : params.product;

  const fetchAndSetReviews = async (productId: string) => {
    try {
      const updatedReviews = await fetchProductReviewsWithUserInfo(productId);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (productID && products.length) {
      const foundProduct = products.find((p) => p.id === productID);
      if (foundProduct) {
        setProductData(foundProduct);
        fetchAndSetReviews(productID);
      }
    }
  }, [productID, products]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewComment.trim()) return;

    const review: Review = {
      userId: user.uid,
      comment: reviewComment,
      imagePath: "/placeholderpfp.jpg",
    }

    try {
      await addReview(productID, review);
      fetchAndSetReviews(productID);
      setReviewComment('');

    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  if (!productData) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <hr />
      <div className="flex flex-col p-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="relative w-full aspect-square border border-black">
            <Image src={productData.imageUrl} alt={productData.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-between xl:justify-start py-2">
            <div className="mb-4">
              <h1 className="font-bold text-2xl">{productData.name}</h1>
              <p className="text-xl text-gray-700">${productData.price}</p>
            </div>
            <p className="text-gray-600">{productData.description}</p>
          </div>
        </div>
        <hr className="my-8" />
        {!user ? (
          <p>Please log in to write a review.</p>
        ) : user ? (
          <form className="my-2 flex flex-col" onSubmit={handleReviewSubmit}>
            <h1 className="text-lg font-bold">Write a review about this product:</h1>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Tell us about this product..."
              className="border p-2 h-36 mb-4 resize-none rounded"
            ></textarea>
            <button className="py-2 px-4 border border-black font-bold transition-all duration-300 hover:bg-black hover:text-white rounded">
              Submit Review
            </button>
          </form>
        ) : (
          <p>Please log in to write a review.</p>
        )}
        <div className="flex flex-col mt-8">
          <h1 className="text-lg font-bold mb-4">Other Reviews:</h1>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ProductReview
                key={index}
                name={review.username || "Anonymous"}
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
