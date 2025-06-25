import { useModalStore } from "./store/modalStore";
import { useToastStore } from "./store/toastStore";
import AccountToast from "./components/AccountToast";
import Content from "./components/Content";
import AddUserModal from "./components/AddUserModal";

export default function App() {
    const isToastOpen = useToastStore((state) => state.isToastOpen);
    const toastUser = useToastStore((state) => state.toastUser);
    const isAddUserModalOpen = useModalStore(
        (state) => state.isAddUserModalOpen
    );
    return (
        <>
            <div className="flex flex-row h-screen w-screen justify-center">
                <Content />
                {isToastOpen && <AccountToast userName={toastUser!} />}
                {isAddUserModalOpen && <AddUserModal />}
            </div>
        </>
    );
}
