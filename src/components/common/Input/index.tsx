import { useTheme } from "@/context/ThemeContext";
import { AppContext } from "@/context/store";
import React, { ForwardedRef, ChangeEvent, useContext } from "react";

interface IInputProps {
    id?: string;
    type?: string;
    name?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    classNames?: string;
    labelText?: string;
    defaultValue?: string;
    placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
    (
        {
            id,
            type,
            onChange,
            classNames,
            labelText,
            name,
            defaultValue,
            placeholder,
        },
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const labelElement = labelText && (
            <label htmlFor={id}>{labelText}</label>
        );
        const { theme } = useTheme();
        const { state } = useContext(AppContext);
        return (
            <div className="flex flex-col items-end gap-xs self-stretch">
                {labelElement}
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    onChange={onChange}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={`p-xs self-stretch rounded-[6px] border border-gray-400 h-xl ${classNames} ${
                        state.user.access && theme
                    }`}
                />
            </div>
        );
    }
);

export default Input;
