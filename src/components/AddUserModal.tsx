import { useModalStore } from "../store/modalStore";
import { useListStore } from "../store/listStore";
import { useRef, useState } from "react";

export default function AddUserModal() {
    const { setAddUserModalOpen } = useModalStore();
    const { addUser } = useListStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const [showLengthMsg, setShowLengthMsg] = useState(false);

    const handleCloseModal = () => {
        setAddUserModalOpen();
    };
    const handleSubmitModal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userNames = inputRef
            .current!.value.split(",")
            .map((name) => name.replace(/\s/g, ""))
            .filter((name) => name !== "");

        if (userNames.some((name) => name.length > 3)) {
            setShowLengthMsg(true);
            return;
        }

        userNames.forEach((name) => {
            addUser(name);
        });
        setAddUserModalOpen();
    };

    return (
        <>
            <div
                className="fixed h-screen w-screen bg-[#00000080] flex items-center justify-center"
                onClick={handleCloseModal}
            >
                <form
                    className="flex flex-col p-10 pb-5 rounded-2xl bg-white items-center gap-5"
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmitModal}
                >
                    <div className="w-full">
                        <h2>인원 추가</h2>
                    </div>
                    <div>
                        <input
                            placeholder="이름을 입력해주세요."
                            ref={inputRef}
                        ></input>
                        {showLengthMsg && (
                            <p className="text-red-600 text-sm pl-1">
                                이름은 최대 3글자까지만 입력 가능합니다.
                            </p>
                        )}
                    </div>
                    <button className="h-[40px] w-[100px] rounded-full bg-black text-white hover:scale-105 active:scale-95 duration-200">
                        확인
                    </button>
                </form>
            </div>
        </>
    );
}
