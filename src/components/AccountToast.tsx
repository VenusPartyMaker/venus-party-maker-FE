import { useEffect, useRef } from "react";
import { useDataStore } from "../store/dataStore";
// import CharacterCard from "./CharacterCard";

export default function AccountToast({ userName }: { userName: string }) {
    const user = useDataStore((state) => state.list).find(
        (u) => u.name === userName
    );
    const { addAccount, deleteAccount } = useDataStore();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const account = inputRef.current!.value.replace(/\s/g, "");

        addAccount(user!.name, account);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [user?.account]);

    return (
        <>
            <div className="h-full w-[30%] rounded-2xl shadow-[0_0px_10px_rgba(0,0,0,0.5)] p-10 bg-white">
                <h3>{user?.name}</h3>
                {user?.account ? (
                    <>
                        <div className="flex flex-row justify-between items-center">
                            <h2>{user?.account}</h2>
                            <button
                                className="h-10 text-[#7D7D7D]"
                                onClick={() => deleteAccount(user.name)}
                            >
                                다시 입력
                            </button>
                        </div>
                        <div className="grid grid-cols-[30%_30%_30%] justify-between gap-6 pt-[26px]">
                            {/* <CharacterCard />
                            <CharacterCard />
                            <CharacterCard />
                            <CharacterCard /> */}
                            <button className="flex w-[100%] h-[100px] bg-[#F2F2F2] rounded-2xl items-center justify-center text-3xl text-[#7D7D7D] pt-1">
                                +
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleInputAccount}>
                        <input
                            placeholder="모험단 이름을 입력해주세요."
                            className="w-[100%]"
                            ref={inputRef}
                        ></input>
                    </form>
                )}
            </div>
        </>
    );
}
