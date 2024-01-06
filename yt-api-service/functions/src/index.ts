import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";
import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "mono-yt-raw-videos";
const thumbnailsBucketName = "mono-yt-thumbnails";
const videoCollectionId = "videos";

export const createUser = functions.auth.user().onCreate((user) => {
    const userInfo = {
        uid: user.uid,
        email: user.email,
        photoUrl: user.photoURL,
    };

    firestore.collection("users").doc(user.uid).set(userInfo);
    logger.info(`User Created: ${JSON.stringify(userInfo)}`);
    return;
});

export const generateUploadUrl = onCall({ maxInstances: 1 }, async (req) => {
    // Check if the user is authenticated
    if (!req.auth) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called while authenticated."
        );
    }

    const auth = req.auth;
    const data = req.data;
    const bucket = storage.bucket(rawVideoBucketName);

    // Generate a unique file name
    const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

    // Get a v4 signed URL for uploading file
    const [url] = await bucket.file(fileName).getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000,
    });

    return { url, fileName };
});

export const getVideos = onCall({ maxInstances: 1 }, async () => {
    const firstFifty = await firestore
        .collection(videoCollectionId)
        .limit(50)
        .get();

    return firstFifty.docs.map((doc) => doc.data());
});

export const setVideoMetadata = onCall(async (req) => {
    // Check if the user is authenticated
    if (!req.auth)
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called while authenticated."
        );

    const videoId = req.data.videoId;
    const title = req.data.title;
    const description = req.data.description;
    const thumbnail = req.data.thumbnail;

    await firestore.collection(videoCollectionId).doc(videoId).set(
        {
            title,
            description,
            thumbnail,
        },
        { merge: true }
    );

    return;
});

export const generateThumbnailUploadUrl = onCall(async (req) => {
    if (!req.auth)
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called while authenticated."
        );

    const fileName = req.data.videoId;

    // Get a v4 signed URL for uploading file
    const [url] = await storage
        .bucket(thumbnailsBucketName)
        .file(fileName)
        .getSignedUrl({
            version: "v4",
            action: "write",
            expires: Date.now() + 15 * 60 * 1000,
        });

    console.log("Thumbnail Upload Signed URL created.");

    return { url };
});

export const makeThumbnailPublic = onCall(async (req) => {
    const fileName = req.data.videoId;

    await storage.bucket(thumbnailsBucketName).file(fileName).makePublic();
    console.log(
        `Thumbnail is public at gs://${thumbnailsBucketName}/${fileName}`
    );

    return;
});
