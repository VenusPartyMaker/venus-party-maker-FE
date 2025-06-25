import ListItem from "./ListItem";
import { useListStore } from "../store/listStore";

export default function List() {
    const list = useListStore((state) => state.list);

    return (
        <>
            <ul className="flex flex-col gap-5 h-[calc(100%-250px)] w-full p-2 pl-[18px] overflow-y-scroll">
                {list.length ? (
                    list.map((l) => <ListItem key={l.name} user={l} />)
                ) : (
                    <p className="flex h-full w-full items-center justify-center pb-[50px] text-[#7D7D7D]">
                        인원 추가 버튼을 눌러 사람을 추가해주세요.
                    </p>
                )}
            </ul>
        </>
    );
}
