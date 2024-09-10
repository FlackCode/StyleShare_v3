import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateEmail, updatePassword } from "firebase/auth";

export const addUserToDB = async (userId : any, userData : any) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { ...userData, products: [] });
        console.log("User added successfully");
    } catch (error) {
        console.error("Error adding user to db:", error);
    }
}

export const uploadImage = async (file : any) => {
    try {
        const storageRef = ref(storage, `products/${file.name}`);
        const snapshop = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshop.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
}

export const addProduct = async (userId : any, productData : any) => {
    try {
        const productRef = await addDoc(collection(db, 'products'), {
            ...productData, userId, reviews: [],
        });

        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { products: [productRef.id] }, {merge: true});
        console.log("Product added successfully");
    } catch (error) {
        console.error("Error adding product: ", error);
    }
}

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    reviews: Review[];
}
  
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsQuery = query(collection(db, "products"));
    const querySnapshot = await getDocs(productsQuery);
    const products: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name || "",
      imageUrl: doc.data().imageUrl || "",
      description: doc.data().description || "",
      price: doc.data().price || 0,
      reviews: doc.data().reviews || [],
    }));

    return products;
  } catch (error) {
    console.error("Error fetching all products: ", error);
    return [];
  }
};

type Review = {
    userId: string;
    comment: string;
    imagePath: string;
};

export const addReview = async (productId: string, reviewData: Review) => {
    try {
        const productRef = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productRef);

        if(!productSnapshot.exists()) {
            throw new Error("Product not found");
        }

        const currentReviews = productSnapshot.data().reviews || [];
        await setDoc(productRef, {reviews: [ ...currentReviews, reviewData ]}, { merge: true });

        console.log("Review added successfully");
    } catch (error) {
        console.error("Error adding review: ", error);
    }
}

export const getUserInfo = async (userId: string) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        throw error;
    }
}

export const getUserProducts = async (userId: string) : Promise<Product[]> => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            throw new Error("User not found");
        }

        const userData = userSnapshot.data();
        const productIds = userData.products || [];

        if (!productIds.length) {
            return [];
        }

        const productsQuery = query(collection(db, "products"));
        const querySnapshot = await getDocs(productsQuery);

        const userProducts: Product[] = querySnapshot.docs.filter(doc => productIds.includes(doc.id)).map(doc => ({
            id: doc.id,
            name: doc.data().name || "",
            imageUrl: doc.data().imageUrl || "",
            description: doc.data().description || "",
            price: doc.data().price || 0,
            reviews: doc.data().reviews || [],
        }));
        
        return userProducts;

    } catch (error) {
        console.error("Error fetching user products: ", error);
        return [];
    }
}

export const changeUserInfo = async (userId: string, updatedInfo: any) => {
    const userRef = doc(db, 'users', userId);

    try {
        if (updatedInfo.username) {
            await updateDoc(userRef, { username: updatedInfo.username });
        }

        if (updatedInfo.password && updatedInfo.password === updatedInfo.confirmPassword && auth.currentUser) {
            await updatePassword(auth.currentUser, updatedInfo.password);
        }
        
        console.log("User information updated successfully.");
    } catch (error) {
        console.error("Error changing user info: ", error);
        throw error;
    }
}
export const fetchProductReviewsWithUserInfo = async (productId: string) => {
    try {
      const productRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productRef);
  
      if (!productSnapshot.exists()) {
        throw new Error("Product not found");
      }
  
      const productData = productSnapshot.data();
      const reviews: Review[] = productData.reviews || [];
  
      const reviewsWithUserInfo = await Promise.all(
        reviews.map(async (review) => {
          const userData = await getUserInfo(review.userId);
          return {
            ...review,
            username: userData.username || 'Anonymous',
          };
        })
      );
  
      return reviewsWithUserInfo;
    } catch (error) {
      console.error("Error fetching product reviews with user info: ", error);
      return [];
    }
  };