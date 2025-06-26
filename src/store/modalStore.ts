import { create } from "zustand";

interface ModalStore {
    isAddUserModalOpen: boolean;
    isAddCharacterModalOpen: boolean;
    modalAccount: string;
    setAddUserModalOpen: () => void;
    CharacterModalOpen: (account: string) => void;
    CharacterModalClose: () => void;
}

export const useModalStore = create<ModalStore>()((set, get) => ({
    isAddUserModalOpen: false,
    isAddCharacterModalOpen: false,
    modalAccount: "",
    setAddUserModalOpen: () => {
        set({ isAddUserModalOpen: !get().isAddUserModalOpen });
    },
    CharacterModalOpen: (account) => {
        set({
            isAddCharacterModalOpen: !get().isAddCharacterModalOpen,
            modalAccount: account,
        });
    },
    CharacterModalClose: () => {
        set({
            isAddCharacterModalOpen: !get().isAddCharacterModalOpen,
            modalAccount: "",
        });
    },
}));
