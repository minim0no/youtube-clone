import express from "express";
import {
    setupDirectories,
    downloadRawVideo,
    convertVideo,
    uploadProcessedVideo,
    deleteRawVideo,
    deleteProcessedVideo,
} from "./storage";
import { Upload } from "@google-cloud/storage/build/cjs/src/resumable-upload";

setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req, res) => {
    // pub/sub
    let data;
    try {
        const message = Buffer.from(req.body.message.data, "base64").toString(
            "utf8"
        );
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error("Invalid message payload received");
        }
    } catch (err) {
        console.error(err);
        return res.status(400).send("Bad request: missing filename.");
    }

    const inputFileName = data.name;
    const outputFileName = `processed-${data.name}`;

    // Download raw video from Cloud Storage
    await downloadRawVideo(inputFileName);

    // Convert raw video to 360p
    try {
        await convertVideo(inputFileName, outputFileName);
    } catch (err) {
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName),
        ]);
        console.error(err);
        return res
            .status(500)
            .send("Internal Server Error: failed to process video.");
    }

    // Upload processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName);

    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName),
    ]);

    return res.status(200).send("Video processed successfully.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
