interface UploadModalInputProps {
    id?: "title" | "description";
    label: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    setValue: (value: string) => void;
    focused: boolean;
    setFocused: (focused: boolean) => void;
}

export default function UploadModalInput({
    id,
    label,
    placeholder,
    required,
    value,
    setValue,
    focused,
    setFocused,
}: UploadModalInputProps) {
    return (
        <div
            className={`w-full border-[1px]  rounded-md px-3 pb-3 ml-2 ${
                id === "title"
                    ? `${value ? "border-[#e6e6e6]" : "border-[#c00]"}`
                    : "border-[#e6e6e6]"
            }
    ${focused ? "border-[#2196f3]" : ""}`}
        >
            <label
                htmlFor={id}
                className={`font-normal tracking-[.011em]  text-xs leading-3 mt-3 ${
                    id === "title"
                        ? `${value ? "text-[#606060]" : "text-[#c00]"}`
                        : "text-[#606060]"
                }
        ${focused ? "text-[#2196f3]" : ""}`}
            >
                {label}
            </label>
            {id === "title" ? (
                <input
                    id="title"
                    className="w-full h-full leading-6 text-sm font-normal mt-1 focus:outline-none"
                    placeholder={placeholder}
                    required={required}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            ) : (
                <textarea
                    id="description"
                    className="w-full h-[110px] leading-6 text-sm font-normal mt-1 focus:outline-none resize-none"
                    placeholder="Tell viewers about your video"
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            )}
            <div className="w-full h-4"></div>
        </div>
    );
}
