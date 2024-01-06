import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");
const getVideosFunction = httpsCallable(functions, "getVideos");
const setVideoMetadata = httpsCallable(functions, "setVideoMetadata");
const generateThumbnailUploadUrl = httpsCallable(
    functions,
    "generateThumbnailUploadUrl"
);
const makeThumbnailPublic = httpsCallable(functions, "makeThumbnailPublic");

export interface Video {
    id?: string;
    uid?: string;
    filename?: string;
    status?: "processing" | "processed";
    title?: string;
    description?: string;
    thumbnail?: boolean;
}

async function uploadThumbnail(videoId: string, thumbnail: File) {
    const response: any = await generateThumbnailUploadUrl({ videoId });

    // Upload the thumbnail with signed URL
    await fetch(response?.data?.url, {
        method: "PUT",
        body: thumbnail,
        headers: {
            "Content-Type": thumbnail.type,
        },
    });

    // Make the thumbnail public in bucket
    await makeThumbnailPublic({ videoId });

    return;
}

export async function uploadVideo(
    file: File,
    thumbnail: File | undefined,
    title: string,
    description: string
) {
    const response: any = await generateUploadUrl({
        fileExtension: file.name.split(".").pop(),
    });
    const videoId = response?.data?.fileName.split(".")[0];

    // Upload the thumbnail to bucket
    try {
        if (thumbnail) {
            await uploadThumbnail(videoId, thumbnail);
        }
    } catch (err) {
        alert(`Error uploading thumbnail: ${err}`);
        return;
    }

    // Upload the file using signed URL
    await fetch(response?.data?.url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });

    // Set video metadata
    try {
        await setVideoMetadata({
            videoId,
            title,
            description,
            thumbnail: thumbnail ? true : false,
        });
    } catch (err) {
        alert(`Error setting video metadata: ${err}`);
        return;
    }

    return;
}

export async function getVideos() {
    const response: any = await getVideosFunction();
    return response.data as Video[];
}
