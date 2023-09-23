import React, { ReactNode } from "react";

interface IFormContainerProps {
    title?: string;
    children?: ReactNode;
}
const FormContainer: React.FC<IFormContainerProps> = ({ title, children }) => {
    return (
        <div className="flex flex-col items-center gap-l w-[640px] p-m shadow-card rounded-[20px] bg-white direction-rtl">
            <h1 className="text-black text-right text-heading-l font-[800]">
                {title}
            </h1>

            {children}
        </div>
    );
};

export default FormContainer;
