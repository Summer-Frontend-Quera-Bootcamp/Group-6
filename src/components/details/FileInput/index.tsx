import React, { ChangeEvent } from "react";
import { usePalette } from "@context/PaletteContext";

// Define the props for the FileInput component
interface IFileInputProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    classNames?: string;
    labelText?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, IFileInputProps>(
    ({ onChange, classNames, labelText }, ref) => {
        // Use palette from PaletteContext
        const { palette } = usePalette();

        // Style object for dynamic palette colors
        const dynamicStyles = {
            borderColor: palette || undefined,
            color: palette || undefined,
        };

        return (
            <div className="w-full">
                {/* Hidden input for file selection */}
                <input
                    type="file"
                    className="hidden"
                    id="hidden-file-input"
                    onChange={onChange}
                    ref={ref} // Forwarded ref is applied here
                />
                {/* Visible label and container for file input */}
                <div
                    className={`flex p-2 items-center gap-2 rounded border border-brand-primary ${classNames}`}
                    style={dynamicStyles}
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

// Provide a display name for the component, useful in debugging
FileInput.displayName = "FileInput";

export default FileInput;
