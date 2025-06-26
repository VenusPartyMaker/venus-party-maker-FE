import { IoClose } from "react-icons/io5";
import { isBuffer } from "../utils/isBuffer";

export default function ListCharacter({ character }: { character: Character }) {
    return (
        <>
            <div className="flex flex-row items-center gap-1">
                <span
                    className={`pt-1 ${
                        isBuffer(character.jobName)
                            ? "text-[#FF8D7B]"
                            : "text-[#7bb0ff]"
                    }`}
                >
                    {character.characterName}
                </span>
                <IoClose size={20} color="#7D7D7D" />
            </div>
        </>
    );
}
