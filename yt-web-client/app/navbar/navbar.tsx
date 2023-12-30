import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
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
        </nav>
    );
}
