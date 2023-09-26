interface IColorSelectorProps {
    colorPalette: string;
    setColorPalette: React.Dispatch<any>;
}

const ColorSelector: React.FC<IColorSelectorProps> = ({
    colorPalette,
    setColorPalette,
}: any) => {
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
        <div className="flex justify-center items-center gap-[13px]">
            {colors.map((color) => (
                <>
                    {color === colorPalette ? (
                        <div
                            key={color}
                            className="w-[29px] h-[28px]  rounded-[12px] relative"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorClick(color)}
                        >
                            <div className="absolute top-[8px] left-[8px] w-[12px] h-[12px] bg-white rounded-[6px]"></div>
                        </div>
                    ) : (
                        <div
                            key={color}
                            className={`w-5 h-5 rounded-[8px] hover:transition-transform hover:shrink-0 hover:w-m hover:h-m  duration-200 ease-in-out`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorClick(color)}
                        ></div>
                    )}
                </>
            ))}
        </div>
    );
};

export default ColorSelector;
