import React, { ForwardedRef } from "react";

interface IInputProps {
    id?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classNames?: string[];
    labelText?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
    (
        { id, type, onChange, classNames, labelText },
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className="flex flex-col items-end gap-xs self-stretch">
                {labelText && <label htmlFor={id}>{labelText}</label>}
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    onChange={onChange}
                    className={`p-xs self-stretch rounded-[6px] border border-gray-400 h-xl ${
                        classNames?.join(" ") || ""
                    }`}
                />
            </div>
        );
    }
);

export default Input;
