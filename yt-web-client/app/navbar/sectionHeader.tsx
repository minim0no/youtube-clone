export default function SectionHeader({ value }: { value: string }) {
    return (
        <h1 className="flex justify-start items-center ml-2 font-medium text-2xl leading-8">
            {value}
        </h1>
    );
}
