import { getVideos } from "./firebase/functions";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
    const videos = await getVideos();
    const imagePrefix = "https://storage.googleapis.com/mono-yt-thumbnails/";

    return (
        <main className="flex justify-center items-center flex-wrap">
            {videos.map((video) =>
                video.filename ? (
                    <Link
                        href={`/watch?v=${
                            video.id + "." + video.filename.split(".")[1]
                        }`}
                        key={video.id}
                    >
                        <div className="flex justify-center items-center w-[220px] h-[152.16px] bg-black m-2.5">
                            <Image
                                src={
                                    video.thumbnail
                                        ? imagePrefix + video.id
                                        : "/thumbnail.png"
                                }
                                alt="video"
                                width={220}
                                height={152.16}
                            />
                        </div>
                        <div className="ml-2.5">{`${
                            video.title ? video.title : "Untitled"
                        }`}</div>
                    </Link>
                ) : (
                    ""
                )
            )}
        </main>
    );
}

export const revalidate = 30;
