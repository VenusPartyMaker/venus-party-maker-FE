import { useModalStore } from "../store/modalStore";
import { useDataStore } from "../store/dataStore";
import { useEffect, useRef, useState } from "react";
import { addCharacter } from "../apis/character";

export default function AddCharacterModal({ userName }: { userName: string }) {
    const { CharacterModalClose } = useModalStore();
    const user = useDataStore((state) => state.list).find(
        (u) => u.name === userName
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const [serverSelect, setServerSelect] = useState("anton");
    const serverList = [
        { id: "anton", name: "안톤" },
        { id: "bakal", name: "바칼" },
        { id: "cain", name: "카인" },
        { id: "casillas", name: "카시야스" },
        { id: "diregie", name: "디레지에" },
        { id: "hilder", name: "힐더" },
        { id: "prey", name: "프레이" },
        { id: "siroco", name: "시로코" },
    ];
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleServer = (
        serverId: string,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        setServerSelect(serverId);
    };

    const handleSubmitModal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await addCharacter(
            user!.account!,
            serverSelect,
            inputRef?.current!.value
        );
        console.log(response);

        if (response.data === "Error") {
            setErrorMsg(response.message);
        } else {
            setErrorMsg(null);
        }

        inputRef.current!.value = "";
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <div
                className="fixed h-screen w-screen bg-[#00000080] flex items-center justify-center"
                onClick={CharacterModalClose}
            >
                <div
                    className="flex flex-col w-[500px] p-10 pb-5 rounded-2xl bg-white items-center gap-5"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full">
                        <h2>캐릭터 추가</h2>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-2">
                        {serverList.map((server) => (
                            <button
                                className={`server-btn ${
                                    serverSelect === server.id &&
                                    "server-btn-selected"
                                }`}
                                onClick={(e) => handleServer(server.id, e)}
                                key={server.id}
                            >
                                {server.name}
                            </button>
                        ))}
                    </div>
                    <form
                        onSubmit={handleSubmitModal}
                        className="w-full flex flex-col items-center gap-5"
                    >
                        <div className="w-full">
                            <input
                                placeholder="캐릭터 이름을 입력해주세요."
                                ref={inputRef}
                            ></input>
                            {errorMsg && (
                                <p className="text-red-600 text-sm pl-1">
                                    {errorMsg}
                                </p>
                            )}
                        </div>
                        <button className="h-[40px] w-[100px] rounded-full bg-black text-white hover:scale-105 active:scale-95 duration-200">
                            확인
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
