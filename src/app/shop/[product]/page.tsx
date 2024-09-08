"use client";

import Navbar from '@/components/NavBar';
import ProductReview from '@/components/ProductReview';
import { addReview, getAllProducts, getUserInfo } from '@/lib/firebaseService';
import { useUserStore } from '@/lib/stateHandler';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

type Review = {
  name: string;
  comment: string;
  imagePath: string;
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
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);

  const params = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewComment, setReviewComment] = useState<string>('');
  const productID = Array.isArray(params.product) ? params.product[0] : params.product;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.uid) {
        try {
          const info = await getUserInfo(user.uid);
          setUserInfo(info);
        } catch (error) {
          console.error("Error fetching user info: ", error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]);

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
      }
    }
  }, [productID, products]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewComment.trim()) return;
    if (!userInfo) {
      console.error("User info is not available.");
      return;
    }

    const review: Review = {
      name: userInfo.username,
      comment: reviewComment,
      imagePath: "/placeholderpfp.jpg",
    }

    try {
      await addReview(productID, review);

      if (productData) {
        setProductData({
          ...productData,
          reviews: [...productData.reviews, review],
        });
      }

      setReviewComment('');

    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  if (!productData) return <p>Loading...</p>;
  if (userLoading) return <p>Loading user info...</p>;

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
        {userLoading ? (
          <p>Loading user info...</p>
        ) : userInfo ? (
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
          {productData.reviews.length > 0 ? (
            productData.reviews.map((review, index) => (
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
