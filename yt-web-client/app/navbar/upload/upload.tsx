"use client";

import { doc } from "firebase/firestore";
import { uploadVideo } from "../../firebase/functions";
import { useEffect, useState } from "react";
import { set } from "firebase/database";
import UploadModalButton from "./uploadModalButton";
import UploadModalInput from "./uploadModalInput";
import SectionHeader from "../sectionHeader";
import UploadThumbnail from "./uploadThumbnail";

export default function Upload() {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [titleFocused, setTitleFocused] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionFocused, setDescriptionFocused] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
    const [image, setImage] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            handleUpload(file);
        }
    };

    const handleUpload = async (file: File) => {
        try {
            const response = await uploadVideo(file);
            alert(
                `File uploaded succcessfully. Response: ${JSON.stringify(
                    response
                )}`
            );
        } catch (error) {
            alert(`Failed to upload file: ${error}`);
        }
    };

    return (
        <>
            <UploadModalButton
                setTitle={setTitle}
                setDescription={setDescription}
                setThumbnail={setThumbnail}
                setImage={setImage}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                type="open"
            />
            {modalOpen && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-10"></div>
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
                        <div className="w-3/5 bg-white border-[1px] rounded-md">
                            <header className="h-16 flex justify-between items-center font-sans border-b-[1px] p-6">
                                <p className="text-xl leading-7 whitespace-nowrap overflow-hidden font-medium">
                                    {title || "Upload a video"}
                                </p>
                                <UploadModalButton
                                    setTitle={setTitle}
                                    setDescription={setDescription}
                                    setThumbnail={setThumbnail}
                                    setImage={setImage}
                                    modalOpen={true}
                                    setModalOpen={setModalOpen}
                                    type="close"
                                />
                            </header>
                            <section className="p-7 border-b-[1px]">
                                <div className="flex flex-col justify-start items-start gap-6">
                                    <SectionHeader value={"Details"} />
                                    <UploadModalInput
                                        id="title"
                                        label="Title (required)"
                                        placeholder="Add a title that describes your video"
                                        required={true}
                                        value={title}
                                        setValue={setTitle}
                                        focused={titleFocused}
                                        setFocused={setTitleFocused}
                                    />
                                    <UploadModalInput
                                        id="description"
                                        label="Description"
                                        placeholder="Tell viewers about your video"
                                        required={false}
                                        value={description}
                                        setValue={setDescription}
                                        focused={descriptionFocused}
                                        setFocused={setDescriptionFocused}
                                    />
                                    <UploadThumbnail
                                        image={image}
                                        setImage={setImage}
                                        thumbnail={thumbnail}
                                        setThumbnail={setThumbnail}
                                    />
                                </div>
                            </section>
                            <footer className="flex justify-end items-center h-16 font-sans p-6">
                                <input
                                    id="upload"
                                    className="hidden"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="upload"
                                    className="flex justify-center items-center min-w-[36px] h-[36px] px-4 bg-[#065fd4] font-semibold text-white text-sm leading-5 tracking-[0.01em] border-0 rounded-sm cursor-pointer"
                                >
                                    SELECT FILES
                                </label>
                            </footer>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
