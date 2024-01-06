import { getVideos } from "./firebase/functions";
import Link from "next/link";
import Image from "next/image";
import Content from "./content/content";

export default async function Home() {
    const videos = await getVideos();

    return (
        <main className="flex justify-start items-center flex-wrap">
            {videos.map((video) => (
                <Content video={video} key={video.id} />
            ))}
        </main>
    );
}

export const revalidate = 30;
