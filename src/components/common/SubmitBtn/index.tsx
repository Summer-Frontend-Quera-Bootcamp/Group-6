import React from "react";
import { usePalette } from "@context/PaletteContext";
interface ISubmitBtnProps {
    value?: string;
    ariaLabel?: string;
    className?: string;
    enablePalette?: boolean;
}

const SubmitBtn: React.FC<ISubmitBtnProps> = ({
    value,
    ariaLabel,
    className,
    enablePalette = true,
}) => {
    const { palette }: any = usePalette();
    return (
        <input
            className={`flex h-xl p-[10px] justify-center items-center gap-[10px] bg-brand-primary text-white rounded-[6px] hover:cursor-pointer ${className}`}
            type="submit"
            value={value}
            aria-label={ariaLabel}
            style={{
                backgroundColor: enablePalette ? palette : undefined,
            }}
        />
    );
};

export default SubmitBtn;
