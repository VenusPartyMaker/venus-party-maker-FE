import { IoClose } from "react-icons/io5";

export default function ListCharacter({
    name,
    isBuffer,
}: {
    name: string;
    isBuffer: boolean;
}) {
    return (
        <>
            <div className="flex flex-row items-center gap-1">
                <span
                    className={`pt-1 ${
                        isBuffer ? "text-[#FF8D7B]" : "text-[#7bb0ff]"
                    }`}
                >
                    {name}
                </span>
                <IoClose size={20} color="#7D7D7D" />
            </div>
        </>
    );
}
