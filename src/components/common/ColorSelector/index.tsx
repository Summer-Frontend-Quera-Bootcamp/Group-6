import React from "react";

interface IColorSelectorProps {
    colorPalette: string;
    setColorPalette: React.Dispatch<string>;
    classNames?: string;
}

const ColorSelector: React.FC<IColorSelectorProps> = ({
    colorPalette,
    setColorPalette,
    classNames,
}) => {
    let colors = [
        "#228BE6",
        "#208D8E",
        "#15AABF",
        "#BE4BDB",
        "#40C057",
        "#4C6EF5",
        "#82C91E",
        "#FD7E14",
        "#E64980",
        "#FA5252",
        "#12B886",
        "#7950F2",
        "#FAB005",
    ];

    const handleColorClick = (colorHex: string) => {
        setColorPalette(colorHex);
    };

    return (
        <div className={`flex items-center gap-[13px] ${classNames}`}>
            {colors.map((color) => (
                <div
                    key={color}
                    className={`flex items-center justify-center rounded-[50%]  cursor-pointer ${
                        color === colorPalette
                            ? "w-[25px] h-[25px]"
                            : "w-[20px] h-[20px] hover:scale-125 duration-200 ease-in-out"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                >
                    {color === colorPalette && (
                        <span className=" w-[12px] h-[12px] bg-white rounded-[50%]"></span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ColorSelector;
