import { useState } from "react";
import AccountToast from "./components/AccountToast";
import Content from "./components/Content";

export default function App() {
    const [isToastOpen, setIsToastOpen] = useState(false);
    return (
        <>
            <div className="flex flex-row h-screen w-screen justify-center">
                <Content />
                {isToastOpen && <AccountToast />}
            </div>
        </>
    );
}
