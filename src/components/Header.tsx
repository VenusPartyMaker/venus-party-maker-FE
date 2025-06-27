import { useModalStore } from "../store/modalStore";
import { useDataStore } from "../store/dataStore";

export default function Header() {
    const { setAddUserModalOpen } = useModalStore();
    const userCount = useDataStore((state) => state.userCount);
    const dealerCount = useDataStore((state) => state.dealerCount);
    const bufferCount = useDataStore((state) => state.bufferCount);

    const handleAddUserModal = () => {
        setAddUserModalOpen();
    };
    return (
        <>
            <div className="h-[150px] justify-center flex flex-col gap-1">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1>베누스 파티 메이커</h1>
                    <button
                        className="h-[40px] w-[120px] rounded-full border-2 hover:bg-gray-200 duration-200"
                        onClick={handleAddUserModal}
                    >
                        유저 추가
                    </button>
                </div>
                <div className="flex flex-row justify-between text-lg">
                    <div className="flex flex-row gap-4">
                        <p>
                            딜러{" "}
                            <span className="gmarket-bold text-blue-300">
                                {dealerCount}
                            </span>
                        </p>
                        <p>
                            버퍼{" "}
                            <span className="gmarket-bold text-red-300">
                                {bufferCount}
                            </span>
                        </p>
                    </div>
                    <p>
                        <span className="gmarket-bold">{userCount}</span>명
                    </p>
                </div>
            </div>
        </>
    );
}
