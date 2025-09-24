import { create } from "zustand";
import { isBuffer } from "../utils/isBuffer";

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
    deleteCharacter: (user: string, character: Character) => void;
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
        const deleteUser = get().list.find((u) => u.name === user);
        const deleteBufferCount = deleteUser!.characters.filter((character) =>
            isBuffer(character.jobName)
        ).length;
        const deleteDealerCount =
            deleteUser!.characters.length - deleteBufferCount!;

        set({
            list: get().list.filter((u) => u.name !== user),
            userCount: get().userCount - 1,
            dealerCount: get().dealerCount - deleteDealerCount,
            bufferCount: get().bufferCount - deleteBufferCount,
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
            dealerCount: isBuffer(character.jobName)
                ? get().dealerCount
                : get().dealerCount + 1,
            bufferCount: isBuffer(character.jobName)
                ? get().bufferCount + 1
                : get().bufferCount,
        });
    },
    deleteCharacter: (user, character) => {
        set({
            list: get().list.map((u) =>
                u.name === user
                    ? {
                          ...u,
                          characters: u.characters.filter(
                              (c) => c.characterId !== character.characterId
                          ),
                      }
                    : u
            ),
            dealerCount: isBuffer(character.jobName)
                ? get().dealerCount
                : get().dealerCount - 1,
            bufferCount: isBuffer(character.jobName)
                ? get().bufferCount - 1
                : get().bufferCount,
        });
    },
}));
