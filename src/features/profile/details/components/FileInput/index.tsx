import React from "react";

interface IFileInputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classNames?: string[];
    labelText?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, IFileInputProps>(
    ({ onChange, classNames, labelText }, ref) => {
        return (
            <div className="w-full">
                <input
                    ref={ref}
                    type="file"
                    className="hidden"
                    id="hidden-file-input"
                    onChange={onChange}
                />
                <div
                    className={`flex p-[10px] items-center gap-[10px] rounded-[8px] border-[1px] border-brand-primary ${classNames}`}
                >
                    <label
                        htmlFor="hidden-file-input"
                        className="cursor-pointer bg-transparent text-brand-primary text-body-l"
                    >
                        {labelText}
                    </label>
                </div>
            </div>
        );
    }
);

export default FileInput;
