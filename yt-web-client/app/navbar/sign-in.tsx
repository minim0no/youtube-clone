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
                    className="flex justify-center items-center gap-1 h-9 font-sans font-medium text-[#065fd4] text-sm leading-9 border-[1px] border-black/0.1 rounded-2xl px-2 hover:bg-[#bee0fd] hover:border-transparent"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    Sign out
                </button>
            ) : (
                <button
                    onClick={signInWithGoogle}
                    className="flex justify-center items-center gap-1 h-9 font-sans font-medium text-[#065fd4] text-sm leading-9 border-[1px] border-black/0.1 rounded-2xl px-2 hover:bg-[#bee0fd] hover:border-transparent"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    Sign in
                </button>
            )}
        </>
    );
}
