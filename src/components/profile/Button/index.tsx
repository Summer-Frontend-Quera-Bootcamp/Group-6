import React from "react";
import { usePalette } from "@context/PaletteContext";

interface IButtonProps {
    className?: string;
    icon?: string;
    text?: string;
}

const Button: React.FC<IButtonProps> = ({ className, icon, text }) => {
    // Retrieve the current palette from the context
    const { palette }: IPaletteContext = usePalette();

    return (
        <button
            title="return"
            className={
                "flex py-[4px] px-xs rounded-[8px] text-white gap-xs items-center " +
                className
            }
            style={{ backgroundColor: palette }}
        >
            {text && <p className="text-body-l">{text}</p>}

            {/* Conditionally render the icon if it exists */}
            {icon && (
                <img src={icon} title="arrow" className="w-[24px] h-[24px]" />
            )}
        </button>
    );
};

export default Button;
