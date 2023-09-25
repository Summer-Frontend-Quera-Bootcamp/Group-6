import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../components/common";

interface IAuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
    const userPath = useLocation().pathname;
    const isLoginPage = userPath === "/login";
    const statusText = isLoginPage
        ? "ثبت‌نام نکرده‌ای؟"
        : "قبلا ثبت‌نام کرده‌ای؟";
    const buttonText = isLoginPage ? "ثبت نام" : "ورود";

    return (
        <div className="flex flex-col h-[100vh] authentication-layout">
            <Navbar statusText={statusText} buttonText={buttonText} />
            <div className="flex flex-grow items-center justify-center z-10">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
