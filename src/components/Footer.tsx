import { getParty } from "../apis/party";
import { useDataStore } from "../store/dataStore";

export default function Footer() {
    const list = useDataStore((state) => state.list);

    const createParty = async () => {
        const party = await getParty(list);
        console.log(party);
    };

    return (
        <>
            <div className="h-[100px] w-full justify-center flex items-center">
                <button
                    className="h-[50px] w-[160px] rounded-full bg-black text-white text-xl hover:scale-105 active:scale-95 duration-200"
                    onClick={createParty}
                >
                    파티 생성
                </button>
            </div>
        </>
    );
}
