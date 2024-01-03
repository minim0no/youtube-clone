import { getVideos } from "./firebase/functions";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
    const videos = await getVideos();

    return (
        <main className="flex justify-center items-center flex-wrap">
            {videos.map((video) => (
                <Link href={`/watch?v=${video.filename}`} key={video.id}>
                    <Image
                        src={"/thumbnail.png"}
                        alt="video"
                        width={220}
                        height={180}
                        className="m-2.5"
                    />
                </Link>
            ))}
        </main>
    );
}

export const revalidate = 30;
