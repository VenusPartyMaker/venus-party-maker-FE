/* 캐릭터 추가 */
export const addCharacter = async (
    adventureName: string,
    serverId: string,
    characterName: string
) => {
    const response = await fetch(
        "http://3.36.58.16:8080/api/v2/character/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                adventureName,
                serverId,
                characterName,
            }),
        }
    );

    const data = await response.json();
    return data;
};

/* 모험단으로 캐릭터 조회 */
export const getCharacter = async (adventureName: string) => {
    const response = await fetch(
        `http://3.36.58.16:8080/api/v2/character/get?adventureName=${adventureName}`
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "캐릭터 조회 실패");
    }

    const { data } = await response.json();
    return data;
};
