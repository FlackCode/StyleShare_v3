import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
            ...productData, userId
        });

        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { prodcuts: [productRef.id] }, {merge: true});
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
      }));
  
      return products;
    } catch (error) {
      console.error("Error fetching all products: ", error);
      return [];
    }
  };