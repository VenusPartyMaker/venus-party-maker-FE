import { create } from "zustand";

interface DataStore {
    list: User[];
    userCount: number;
    dealerCount: number;
    bufferCount: number;
    addUser: (user: string) => void;
    deleteUser: (user: string) => void;
    addAccount: (user: string, account: string) => void;
    deleteAccount: (user: string) => void;
    addCharacter: (user: string, character: Character) => void;
    // deleteCharacter: (name: string) => void;
}

export const useDataStore = create<DataStore>()((set, get) => ({
    list: [],
    userCount: 0,
    dealerCount: 0,
    bufferCount: 0,
    addUser: (user) => {
        set({
            list: [
                ...get().list,
                { name: user, account: null, server: null, characters: [] },
            ],
            userCount: get().userCount + 1,
        });
    },
    deleteUser: (user) => {
        set({
            list: get().list.filter((u) => u.name !== user),
            userCount: get().userCount - 1,
        });
    },
    addAccount: (user, account) => {
        set({
            list: get().list.map((u) =>
                u.name === user ? { ...u, account: account } : u
            ),
        });
    },
    deleteAccount: (user) => {
        set({
            list: get().list.map((u) =>
                u.name === user ? { ...u, account: null } : u
            ),
        });
    },
    addCharacter: (user, character) => {
        set({
            list: get().list.map((u) =>
                u.name === user
                    ? { ...u, characters: [...u.characters, character] }
                    : u
            ),
        });
    },
    // deleteCharacter: (name) => {},
}));
