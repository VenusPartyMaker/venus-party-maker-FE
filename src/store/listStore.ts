import { create } from "zustand";

interface ListStore {
    list: User[];
    addUser: (user: string) => void;
    deleteUser: (user: string) => void;
    // addCharacter: (character: { name: string; isBuffer: boolean }) => void;
    // deleteCharacter: (name: string) => void;
}

export const useListStore = create<ListStore>()((set, get) => ({
    list: [],
    addUser: (user) => {
        set({
            list: [
                ...get().list,
                { name: user, account: null, server: null, characters: [] },
            ],
        });
    },
    deleteUser: (user) => {
        set({
            list: get().list.filter((u) => u.name !== user),
        });
    },
    // addCharacter: (character) => {},
    // deleteCharacter: (name) => {},
}));
