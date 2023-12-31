import express from "express";
import {
    setupDirectories,
    downloadRawVideo,
    convertVideo,
    uploadProcessedVideo,
    deleteRawVideo,
    deleteProcessedVideo,
} from "./storage";
import { isNewVideo, setVideo, getUser } from "./firestore";

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
            throw new Error("Invalid message payload received.");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send("Bad Request: missing filename.");
    }

    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;
    const videoId = inputFileName.split(".")[0];

    if (!isNewVideo(videoId)) {
        return res
            .status(400)
            .send("Bad request: Video already processing or processed.");
    } else {
        await setVideo(videoId, {
            id: videoId,
            user: await getUser(videoId.split("-")[0]),
            status: "processing",
        });
    }
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
        return res.status(500).send("Processing failed");
    }

    // Upload processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName);

    await setVideo(videoId, {
        status: "processed",
        filename: outputFileName,
    });

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
