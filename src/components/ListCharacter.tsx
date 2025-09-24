import { IoClose } from "react-icons/io5";
import { isBuffer } from "../utils/isBuffer";
import { useDataStore } from "../store/dataStore";

export default function ListCharacter({
    character,
    userName,
}: {
    character: Character;
    userName: string;
}) {
    const { deleteCharacter } = useDataStore();

    const handleDeleteCharacter = () => {
        deleteCharacter(userName, character);
    };

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
                <IoClose
                    size={20}
                    color="#7D7D7D"
                    onClick={handleDeleteCharacter}
                />
            </div>
        </>
    );
}
