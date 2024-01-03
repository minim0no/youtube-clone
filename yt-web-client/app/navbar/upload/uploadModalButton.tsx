import { clear } from "console";
import { set } from "firebase/database";

interface UploadButtonProps {
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setThumbnail: (thumbnail: File | undefined) => void;
    setModalOpen: (modalOpen: boolean) => void;
    setImage: (image: string) => void;
    modalOpen: boolean;
    type?: "open" | "close";
}

export default function UploadModalButton({
    setTitle,
    setDescription,
    setThumbnail,
    setImage,
    modalOpen,
    setModalOpen,
    type = "open",
}: UploadButtonProps) {
    const clearUploadForm = () => {
        setTitle("");
        setDescription("");
        setImage("");
        setThumbnail(undefined);
        setModalOpen(!modalOpen);
    };
    return (
        <button
            className="flex justify-center items-center rounded-[50%] border-0 cursor-pointer text-xs p-1.5 hover:bg-[#e6e6e6]"
            onClick={() => clearUploadForm()}
        >
            {type === "open" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
            )}
        </button>
    );
}
