import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { create } from "zustand";
import { auth } from "./firebase";
import { addUserToDB, getAllProducts } from "./firebaseService";

interface UserState {
    user: any;
    isLoading: boolean;
    error: string | null;
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user:any) => void;
}

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    reviews: Review[];
}

type Review = {
    userId: string;
    comment: string;
    imagePath: string;
};

interface CartItem {
    id: string;
    quantity: number;
    price: number;
    name: string;
    imageUrl: string;
}


interface CartState {
    cart: CartItem[];
    products: Product[];
    total: number;
    discount: number;
    addToCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    fetchProducts: () => Promise<void>;
    calculateTotal: () => void;
    applyPromoCode: (promoCode: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => {
        console.log("Setting User:", user);
        set({ user });
    },

    register: async (username, email, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            if (password != confirmPassword) {
                set({ error: "Passwords do not match", isLoading: false})
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user
                await updateProfile(user, {displayName: username});

                await addUserToDB(user.uid, { username, email: user.email, createdAt: new Date().toISOString() });

                set({ user, isLoading: false });
            }
        } catch (error:any) {
            set({ error: error.message, isLoading: false});
            console.error("Registration error: ", error);
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                set({ user: userCredential.user, isLoading: false });
            }
        } catch (error:any) {
            console.error('Login error:', error);
            set({ error: error.message, isLoading: false});
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            set({ user: null });
        } catch (error: any) {
            set({ error: error.message });
        }
    }
}));

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    products: [],
    total: 0,
    discount: 0,
    
    fetchProducts: async () => {
      const fetchedProducts = await getAllProducts();
      set({ products: fetchedProducts });
    },
    addToCart: (productId, quantity = 1) => {
        set((state) => {
            const product = state.products.find((p) => p.id === productId);
            if (!product) return state;
            const existingCartItem = state.cart.find((item) => item.id === productId);
            if (existingCartItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
                    ),
                };
            } else {
                return {
                    cart: [...state.cart, { id: productId, quantity, price: product.price, name: product.name, imageUrl: product.imageUrl }],
                };
            }
        });
        get().calculateTotal();
    },
    updateQuantity: (productId, quantity) => {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      }));
      get().calculateTotal();
    },
    removeFromCart: (productId) => {
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      }));
      get().calculateTotal();
    },
    clearCart: () => {
        set({ cart: [], total: 0, discount: 0 });
    },    
    calculateTotal: () => {
        const total = get().cart.reduce((acc, item) => {
            const product = get().products.find((p) => p.id === item.id);
            return acc + (product ? product.price * item.quantity : 0);
        }, 0);
        const finalTotal = total - get().discount;
        set({ total: finalTotal < 0 ? 0 : finalTotal });
    },
    applyPromoCode: (promoCode) => {
        if (promoCode === "SECRET") {
            set({ discount: 10 });
        } else {
            set({ discount: 0 });
            alert("Invalid promo code");
        }
        get().calculateTotal();
    },
  }));