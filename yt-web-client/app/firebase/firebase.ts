import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "clone-126d2.firebaseapp.com",
    projectId: "clone-126d2",
    appId: "1:266845316146:web:2f264f52da49fa0cea882b",
    measurementId: "G-SNRY34LTGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

/**
 * Signs the user in with Google popup
 * @returns A promise that resolves with the user's credentials
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs the user out
 * @returns A promise that resolves when the user is signed out
 */
export function signOut() {
    return auth.signOut();
}

/**
 * Trigger a callback when the user auth state changes
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(
    callback: (user: User | null) => void
) {
    return onAuthStateChanged(auth, callback);
}
