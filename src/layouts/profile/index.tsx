import React, { ReactElement, ReactNode } from "react";

import Navbar from "./components/Navbar";
import Panel from "./components/Panel";

interface IProfileLayoutProps {
    children?: ReactNode;
}

const ProfileLayout: React.FC<IProfileLayoutProps> = ({
    children,
}): ReactElement => {
    return (
        <div className="flex flex-row h-[100vh] pr-[50px]">
            <Panel Element={children} />
            <hr className=" bg-[#AAA] w-[0.5px] h-full" />
            <Navbar />
        </div>
    );
};

export default ProfileLayout;
