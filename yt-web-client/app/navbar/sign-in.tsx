"use client";

import { User } from "firebase/auth";
import { signInWithGoogle, signOut } from "../firebase/firebase";

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {
    return (
        <>
            {user ? (
                <button
                    onClick={signOut}
                    className="h-9 font-sans font-medium text-[#065fd4] text-sm leading-9 border-[1px] border-black/0.1 rounded-2xl px-4 hover:bg-[#bee0fd] hover:border-transparent"
                >
                    Sign out
                </button>
            ) : (
                <button
                    onClick={signInWithGoogle}
                    className="h-9 font-sans font-medium text-[#065fd4] text-sm leading-9 border-[1px] border-black/0.1 rounded-2xl px-4 hover:bg-[#bee0fd] hover:border-transparent"
                >
                    Sign in
                </button>
            )}
        </>
    );
}
