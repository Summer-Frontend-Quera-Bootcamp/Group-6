import React from "react";

type ChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
) => void | Promise<void>;

interface ICheckBoxProps {
    acceptedTerms?: boolean;
    onChange?: ChangeHandler;
    onClick?: () => any;
    labelText?: string;
}

const CheckBox: React.FC<ICheckBoxProps> = ({
    acceptedTerms,
    onChange,
    labelText = "",
    onClick,
}) => {
    return (
        <div className="flex gap-2 ml-auto">
            <label
                // htmlFor="acceptedTerms"
                className="cursor-pointer underline"
                onClick={onClick}
            >
                {labelText}
            </label>
            <div className="flex items-center justify-center">
                <input
                    type="checkbox"
                    id="acceptedTerms"
                    className="relative peer shrink-0 appearance-none w-[20px] h-[20px]  border-[1px] border-gray-primary rounded-[4px] checked:border-brand-primary checked:bg-brand-secondary"
                    checked={acceptedTerms}
                    onChange={onChange}
                />
                <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute w-4 h-4 ml-auto hidden peer-checked:block  pointer-events-none"
                >
                    <g id="Group 1">
                        <path
                            id="Line 1"
                            d="M1 5.79297L3 7.79297"
                            stroke="#208D8E"
                            strokeLinecap="square"
                        />
                        <path
                            id="Line 2"
                            d="M10.5 1L3.5 8.29297"
                            stroke="#208D8E"
                            strokeLinecap="square"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default CheckBox;
