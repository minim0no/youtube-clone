"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { User } from "firebase/auth";
import SignIn from "./sign-in";
import Upload from "./upload";

export default function Navbar() {
    // Init user state
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className="w-full h-14 flex justify-between items-center p-4">
            <Link href="/">
                <Image
                    src="/youtube-logo.svg"
                    width={90}
                    height={20}
                    alt="YouTube Logo"
                />
            </Link>
            {user && <Upload />}
            <SignIn user={user} />
        </nav>
    );
}
