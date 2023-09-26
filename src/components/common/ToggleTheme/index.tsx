import LightIcon from "./assets/sun.svg";
import DarkIcon from "./assets/moon.svg";
import { useState } from "react";

const ToggleTheme = () => {
    const [theme, setTheme] = useState<"dark" | "light">("light");

    const togglePosition =
        theme === "dark" ? "translate-x-0" : "translate-x-full";
    const containerBg =
        theme === "dark" ? "bg-gray-darker" : "bg-gray-secondary";

    const iconBg = theme === "light" ? "bg-white" : "bg-gray-primary";
    const transitionStyles = " transition-transform duration-300 ease-in-out";

    return (
        <div
            className={`flex w-[64px] h-[36px] p-[3px] rounded-[8px] items-center cursor-pointer ${containerBg}`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <div
                className={`flex h-[30px] p-[3px]  rounded-[5px] items-start gap-[4px] shadow-themeSwitch ${togglePosition} ${transitionStyles} ${iconBg} `}
            >
                <img
                    src={theme === "dark" ? DarkIcon : LightIcon}
                    alt={
                        theme === "dark" ? "Dark Mode Icon" : "Light Mode Icon"
                    }
                    className="w-auto h-full"
                />
            </div>
        </div>
    );
};

export default ToggleTheme;
