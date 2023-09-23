import React from "react";

interface ISubmitBtnProps {
    value?: string;
    ariaLabel?: string;
}

const SubmitBtn: React.FC<ISubmitBtnProps> = ({ value, ariaLabel }) => {
    return (
        <input
            className="flex h-xl p-[10px] justify-center items-center gap-[10px] self-stretch bg-brand-primary text-white rounded-[6px] hover:cursor-pointer"
            type="submit"
            value={value}
            aria-label={ariaLabel}
        />
    );
};

export default SubmitBtn;
