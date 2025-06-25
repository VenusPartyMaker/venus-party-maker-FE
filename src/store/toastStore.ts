import { create } from "zustand";

interface ToastStore {
    isToastOpen: boolean;
    toastUser: string | null;
    setisToastOpen: (user: string) => void;
}

export const useToastStore = create<ToastStore>()((set, get) => ({
    isToastOpen: false,
    toastUser: null,
    setisToastOpen: (user) => {
        set({ isToastOpen: !get().isToastOpen, toastUser: user });
    },
}));
