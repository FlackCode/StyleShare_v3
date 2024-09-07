import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { create } from "zustand";
import { auth } from "./firebase";

interface UserState {
    user: any;
    isLoading: boolean;
    error: string | null;
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user:any) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),

    register: async (username, email, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            if (password != confirmPassword) {
                set({ error: "Passwords do not match"})
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {displayName: username});
                set({ user: userCredential.user, isLoading: false });
            }
        } catch (error:any) {
            set({ error: error.message, isLoading: false});
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            set({ user: userCredential.user, isLoading: false });
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
}))