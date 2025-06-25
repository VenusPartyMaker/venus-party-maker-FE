import { useModalStore } from "../store/modalStore";

export default function Header() {
    const { setAddUserModalOpen } = useModalStore();

    const handleAddUserModal = () => {
        setAddUserModalOpen();
    };
    return (
        <>
            <div className="h-[150px] justify-center flex flex-col gap-1">
                <div className="w-full flex flex-row justify-between">
                    <h1>베누스 파티 메이커</h1>
                    <button
                        className="h-[40px] w-[120px] rounded-full border-2 hover:bg-gray-200 duration-200"
                        onClick={handleAddUserModal}
                    >
                        인원 추가
                    </button>
                </div>
                <div className="flex flex-row text-lg gap-4">
                    <p>
                        딜러{" "}
                        <span className="gmarket-bold text-blue-300">0</span>
                    </p>
                    <p>
                        버퍼{" "}
                        <span className="gmarket-bold text-red-300">0</span>
                    </p>
                </div>
            </div>
        </>
    );
}
