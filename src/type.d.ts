export declare global {
    interface Character {
        name: string;
        isBuffer: boolean;
    }

    interface User {
        name: string;
        account: string | null;
        server: string | null;
        characters: Character[];
    }
}
