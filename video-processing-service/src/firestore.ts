import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp({ credential: credential.applicationDefault() });

const firestore = new Firestore();

const videoCollectionId = "videos";

export interface Video {
    id?: string;
    uid?: string;
    filename?: string;
    status?: "processing" | "processed";
    title?: string;
    description?: string;
}
/**
 * Fetches the video from Firestore
 * @param videoId - The video you want to fetch
 * @returns An object of the video's data
 */
async function getVideo(videoId: string) {
    const snapshot = await firestore
        .collection(videoCollectionId)
        .doc(videoId)
        .get();

    return snapshot.data() as Video;
}

/**
 * Sets the video's current status
 * @param videoId - The id of the video
 * @param video - The video's metadata
 */
export function setVideo(videoId: string, video: Video) {
    return firestore
        .collection(videoCollectionId)
        .doc(videoId)
        .set(video, { merge: true });
}
/**
 * Determine if the video has not been added to Firestore
 * @param videoId - The video id
 * @returns A boolean that reveals if the video is new.
 */
export async function isNewVideo(videoId: string) {
    const video = await getVideo(videoId);
    return video?.status === undefined;
}
