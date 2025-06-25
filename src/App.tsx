import { useModalStore } from "./store/modalStore";
// import AccountToast from "./components/AccountToast";
import Content from "./components/Content";
import AddUserModal from "./components/AddUserModal";

export default function App() {
    const isAddUserModalOpen = useModalStore(
        (state) => state.isAddUserModalOpen
    );
    return (
        <>
            <div className="flex flex-row h-screen w-screen justify-center">
                <Content />
                {/* {isToastOpen && <AccountToast />} */}
                {isAddUserModalOpen && <AddUserModal />}
            </div>
        </>
    );
}
