import Image from "next/image";

interface UploadThumbnailProps {
    image: string;
    setImage: (image: string) => void;
    thumbnail: File | undefined;
    setThumbnail: (thumbnail: File | undefined) => void;
}

export default function UploadThumbnail({
    image,
    setImage,
    thumbnail,
    setThumbnail,
}: UploadThumbnailProps) {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            setThumbnail(file);
        }
        let reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result as string);
        };

        reader.readAsDataURL(file as File);
    };

    return (
        <div className="flex flex-col justify-center items-start ml-2">
            <h1 className="font-medium text-sm leading-6 pb-2">Thumbnail</h1>
            <p className="font-normal tracking-[.011em]  text-xs leading-3 text-[#606060] pb-2">
                Select or upload a picture that shows what's in your video. A
                good thumbnail stands out and draws viewers' attention.
            </p>
            <div className="flex justify-start items-center gap-2">
                <input
                    id="thumbnail"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <label
                    htmlFor="thumbnail"
                    className="w-[129px] h-[70px] flex flex-col justify-center items-center text-xs leading-4 text-[#606060] border-[1px] border-black border-opacity-10 hover:border-opacity-30 border-dashed rounded-sm  transition--border-opacity ease-in-out duration-300 cursor-pointer"
                >
                    <div className="flex flex-col justify-center items-center px-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.2}
                            stroke="#606060"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                        Upload thumbnail
                    </div>
                </label>
                {thumbnail === undefined ? (
                    ""
                ) : (
                    <div className="flex justify-center items-center w-[129px] h-[70px] bg-transparent">
                        <Image
                            src={image}
                            width={129}
                            height={70}
                            alt="thumbnail"
                            className="w-full h-full object-cover mx-3"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
