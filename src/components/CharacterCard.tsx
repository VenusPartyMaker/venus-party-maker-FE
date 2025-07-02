import { isBuffer } from "../utils/isBuffer";
import { useDataStore } from "../store/dataStore";
export default function CharacterCard({
    user,
    character,
}: {
    user: string;
    character: Character;
}) {
    const { addCharacter } = useDataStore();
    const handleAddCharacterToList = () => {
        addCharacter(user, character);
    };

    return (
        <>
            <div
                className="w-[100%] h-[100px] shadow-[0_2px_6px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col items-center justify-center cursor-pointer"
                onClick={handleAddCharacterToList}
            >
                <h4>{character.characterName}</h4>
                <p className="gmarket-light text-sm">{character.fame}</p>
                <span
                    className={
                        isBuffer(character.jobName)
                            ? "text-[#FF8D7B]"
                            : "text-[#6a9eeb]"
                    }
                >
                    {character.jobName}
                </span>
            </div>
        </>
    );
}
