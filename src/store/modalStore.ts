import { create } from "zustand";

interface ModalStore {
    isAddUserModalOpen: boolean;
    setAddUserModalOpen: () => void;
}

export const useModalStore = create<ModalStore>()((set, get) => ({
    isAddUserModalOpen: false,
    setAddUserModalOpen: () => {
        set({ isAddUserModalOpen: !get().isAddUserModalOpen });
    },
}));
