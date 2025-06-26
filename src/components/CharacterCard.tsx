import { isBuffer } from "../utils/isBuffer";

export default function CharacterCard({ character }: { character: Character }) {
    return (
        <>
            <div className="w-[100%] h-[100px] shadow-[0_2px_6px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col items-center justify-center">
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
