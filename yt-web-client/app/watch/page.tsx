"use client";

import { useSearchParams } from "next/navigation";

export default function Watch() {
    const videoPrefix =
        "https://storage.googleapis.com/mono-yt-processed-videos/";
    const videoSrc = "processed-" + useSearchParams().get("v");

    return (
        <div>
            <video autoPlay controls src={videoPrefix + videoSrc} />
        </div>
    );
}
