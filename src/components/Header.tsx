export default function Header() {
    return (
        <>
            <div className="h-[150px] justify-center flex flex-col gap-1">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-4xl gmarket-bold">
                        베누스 파티 메이커
                    </h1>
                    <button className="h-[40px] w-[120px] rounded-full border-2 pt-1 hover:bg-gray-200 duration-200">
                        인원 추가
                    </button>
                </div>
                <h2 className="flex flex-row text-lg gap-4">
                    <p>
                        딜러{" "}
                        <span className="gmarket-bold text-blue-300">0</span>
                    </p>
                    <p>
                        버퍼{" "}
                        <span className="gmarket-bold text-red-300">0</span>
                    </p>
                </h2>
            </div>
        </>
    );
}
