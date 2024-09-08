import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { create } from "zustand";
import { auth } from "./firebase";
import { addUserToDB } from "./firebaseService";

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
            //console.log("User Credential:", userCredential);
            if (userCredential.user) {
                //console.log("User from Login:", userCredential.user);
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
}))