import { useModalStore } from "./store/modalStore";
import { useToastStore } from "./store/toastStore";
import AccountToast from "./components/AccountToast";
import Content from "./components/Content";
import AddUserModal from "./components/AddUserModal";
import AddCharacterModal from "./components/AddCharacterModal";

export default function App() {
    // const isToastOpen = useToastStore((state) => state.isToastOpen);
    const toastUser = useToastStore((state) => state.toastUser);
    const isAddUserModalOpen = useModalStore(
        (state) => state.isAddUserModalOpen
    );
    const isAddCharacterModalOpen = useModalStore(
        (state) => state.isAddCharacterModalOpen
    );

    return (
        <>
            <div className="flex flex-row h-screen w-screen justify-center">
                <Content />
                {toastUser && <AccountToast userName={toastUser!} />}
                {isAddUserModalOpen && <AddUserModal />}
                {isAddCharacterModalOpen && (
                    <AddCharacterModal userName={toastUser!} />
                )}
            </div>
        </>
    );
}
