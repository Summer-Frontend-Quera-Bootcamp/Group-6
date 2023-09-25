import React, { ReactElement, ReactNode } from "react";

interface IProfileLayoutProps {
    children: ReactNode;
}

const ProfileLayout: React.FC<IProfileLayoutProps> = ({
    children,
}): ReactElement => {
    return <div className="flex flex-col h-[100vh]">{children}</div>;
};

export default ProfileLayout;
