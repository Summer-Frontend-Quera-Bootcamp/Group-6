import React, { ReactElement, ReactNode } from "react";
import SideBar from "@components/dashboard/SideBar";
import { useTheme } from "@/context/ThemeContext";

interface ISpaceLayoutProps {
    children?: ReactNode;
}

const WorkspaceLayout: React.FC<ISpaceLayoutProps> = ({
    children,
}): ReactElement => {
    const { theme }: any = useTheme();

    return (
        <div className={`rtl h-[100vh] flex  ${theme} relative`}>
            <SideBar />
            {children}
        </div>
    );
};

export default WorkspaceLayout;
