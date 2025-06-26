export declare global {
    interface Character {
        serverId: string;
        characterName: string;
        jobName: string;
        characterId: string;
        fame: number;
    }
    interface User {
        name: string;
        account: string | null;
        server: string | null;
        characters: Character[];
    }
}
