import { usePalette } from "@context/PaletteContext";
import React from "react";

interface IFileInputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classNames?: string[];
    labelText?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, IFileInputProps>(
    ({ onChange, classNames, labelText }, ref) => {
        const { palette }: any = usePalette();
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
                    style={{
                        borderColor: palette ? palette : undefined,
                        color: palette ? palette : undefined,
                    }}
                >
                    <label
                        htmlFor="hidden-file-input"
                        className="cursor-pointer bg-transparent text-body-l"
                    >
                        {labelText}
                    </label>
                </div>
            </div>
        );
    }
);

export default FileInput;
