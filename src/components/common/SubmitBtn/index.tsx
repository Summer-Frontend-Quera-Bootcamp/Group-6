import React, { useContext } from "react";
import { AppContext } from "@/context/store";
interface ISubmitBtnProps {
    value?: string;
    ariaLabel?: string;
    className?: string;
    enablePalette?: boolean;
    onSubmit?: () => void;
    type?: string;
    theme?: PaletteColorType;
}

const SubmitBtn: React.FC<ISubmitBtnProps> = ({
    value,
    ariaLabel,
    className,
    enablePalette = true,
    onSubmit,
    type = "submit",
    theme,
}) => {
    const { state } = useContext(AppContext);

    return (
        <input
            className={`flex h-xl p-[10px] justify-center items-center gap-[10px] bg-brand-primary text-white rounded-[6px] hover:cursor-pointer ${className}`}
            type={type}
            value={value}
            aria-label={ariaLabel}
            style={{
                backgroundColor: enablePalette ? theme || state.theme : "",
            }}
            onClick={onSubmit}
        />
    );
};

export default SubmitBtn;
