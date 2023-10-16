import React, { useContext } from "react";
import { AppContext } from "@/context/store";

interface IButtonProps {
    className?: string;
    icon?: string;
    text?: string;
}

const Button: React.FC<IButtonProps> = ({ className, icon, text }) => {
    const { state } = useContext(AppContext);

    return (
        <button
            title="return"
            className={
                "flex py-[4px] px-xs rounded-[8px] text-white gap-xs items-center " +
                className
            }
            style={{ backgroundColor: state.theme }}
        >
            {text && <p className="text-body-l">{text}</p>}

            {icon && (
                <img src={icon} title="arrow" className="w-[24px] h-[24px]" />
            )}
        </button>
    );
};

export default Button;
