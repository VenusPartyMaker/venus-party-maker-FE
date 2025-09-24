import { isBuffer } from "../utils/isBuffer";

/* 파티 생성 */
export const getParty = async (list: User[]) => {
    const response = await fetch(
        "https://venuspartymaker.shop/api/v2/party/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                list.flatMap((user: User) =>
                    user.characters.map((character: Character) => ({
                        characterName: character.characterName,
                        characterId: character.characterId,
                        jobName: character.jobName,
                        ownedName: user.name,
                        isBuffer: isBuffer(character.jobName),
                        serverId: character.serverId,
                    }))
                )
            ),
        }
    );

    const data = await response.json();
    return data;
};
