import React from "react";
import { usePalette } from "@context/PaletteContext";

// Define the props for the SubmitBtn component
interface ISubmitBtnProps {
    value?: string;
    ariaLabel?: string;
    className?: string;
    enablePalette?: boolean;
    onSubmit?: () => void;
    type?: string;
}

const SubmitBtn: React.FC<ISubmitBtnProps> = ({
    value,
    ariaLabel,
    className,
    enablePalette = true,
    onSubmit,
    type = "submit",
}) => {
    // Use palette from PaletteContext
    const { palette }: IPaletteContext = usePalette();

    return (
        <input
            // Combine default and optional classes
            className={`flex h-xl p-[10px] justify-center items-center gap-[10px] bg-brand-primary text-white rounded-[6px] hover:cursor-pointer ${className}`}
            type={type}
            value={value}
            aria-label={ariaLabel}
            // Apply palette color if enablePalette is true
            style={{
                backgroundColor: enablePalette ? palette : undefined,
            }}
            onClick={onSubmit}
        />
    );
};

export default SubmitBtn;
