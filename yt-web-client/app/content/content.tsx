import Link from "next/link";
import Image from "next/image";
import { Video } from "../firebase/functions";

export default function Content({ video }: { video: Video }) {
    const imagePrefix = "https://storage.googleapis.com/mono-yt-thumbnails/";

    return (
        video.filename && (
            <Link
                href={`/watch?v=${
                    video.id + "." + video.filename.split(".")[1]
                }`}
                key={video.id}
            >
                <div className="flex justify-center items-center w-[361px] h-[203px] bg-transparent m-2.5 ">
                    <Image
                        src={
                            video.thumbnail
                                ? imagePrefix + video.id
                                : "/thumbnail.png"
                        }
                        alt="video"
                        width={361}
                        height={203}
                        className="object-cover w-full h-full rounded-xl"
                    />
                </div>
                <div className="max-w-[368px]  flex mt-3 ml-2.5">
                    <div className="mr-3">
                        <Image
                            src={video.user.photoUrl || "/avatar.jpeg"}
                            alt="avatar"
                            width={36}
                            height={36}
                            className="rounded-[50%] min-w-[36px] min-h-[36px]"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <div className="inline-block max-w-[320px] text-xl leading-9 font-medium font-sans overflow-hidden text-ellipsis whitespace-nowrap float-left">{`${
                            video.title ? video.title : "Untitled"
                        }`}</div>
                        <div className="max-w-[320px] text-md leading-8 font-normal text-[#606060]">{`${
                            video.user.email?.split("@")[0]
                        }`}</div>
                    </div>
                </div>
            </Link>
        )
    );
}
