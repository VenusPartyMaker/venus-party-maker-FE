import Footer from "./Footer";
import Header from "./Header";
import List from "./List";

export default function Content() {
    return (
        <>
            <div className="h-full w-[70%] flex justify-center">
                <div className="flex flex-col h-full w-full min-w-[700px] max-w-[1100px] px-10">
                    <Header />
                    <List />
                    <Footer />
                </div>
            </div>
        </>
    );
}
