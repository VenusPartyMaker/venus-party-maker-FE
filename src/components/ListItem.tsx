import { FaRegTrashAlt } from "react-icons/fa";
import ListCharacter from "./ListCharacter";

export default function ListItem({ user }: { user: User }) {
    return (
        <>
            <li className="min-h-[100px] w-full rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.5)] grid grid-cols-[10%_80%_10%] items-center cursor-pointer">
                <h3 className="justify-self-center pt-1">{user.name}</h3>
                {user.characters.length ? (
                    <div className="flex flex-row gap-5">
                        <ListCharacter name="뙒" isBuffer={false} />
                        <ListCharacter name="단비꺼" isBuffer={true} />
                    </div>
                ) : (
                    <div className="text-[#7D7D7D]">
                        이곳을 눌러 캐릭터를 등록해주세요.
                    </div>
                )}
                <div className="justify-self-center p-2 rounded-md hover:bg-gray-100 duration-200">
                    <FaRegTrashAlt size={20} color="red" />
                </div>
            </li>
        </>
    );
}
