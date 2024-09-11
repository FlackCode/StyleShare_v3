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
}

interface CartState {
    cart: CartItem[];
    products: Product[];
    total: number;
    addtoCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    fetchCartProducts: () => Promise<void>;
    calculateTotal: () => void;
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

    addtoCart: (productId) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            set({
                cart: cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1} : item)
            });
        } else {
            set({
                cart: [...cart, { id: productId, quantity: 1 }]
            });
        }
        get().calculateTotal();
        console.log(cart);
    },
    updateQuantity: (productId, quantity) => {
        const { cart } = get();

        if (quantity<= 0) {
            get().removeFromCart(productId);
            return;
        }

        set({
            cart: cart.map(item => item.id === productId ? { ...item, quantity } : item)
        });
        get().calculateTotal();
    },
    removeFromCart: (productId) => {
        set({
            cart: get().cart.filter(item => item.id !== productId)
        });
        get().calculateTotal();
    },
    clearCart: () => {
        set({
            cart: [], total: 0
        });
    },
    fetchCartProducts: async () => {
        try {
            const allProducts = await getAllProducts();
            const cart = get().cart;
            const cartProductIds = cart.map(item => item.id);

            const cartProducts = allProducts.filter(product => cartProductIds.includes(product.id));

            set({
                products: cartProducts
            });
            get().calculateTotal();
        } catch (error) {
            console.error("Error fetching cart products: ", error);
        }
    },
    calculateTotal: () => {
        const { cart, products } = get();

        const total = cart.reduce((sum: number, item: CartItem) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        set({
            total
        });
    },
}));