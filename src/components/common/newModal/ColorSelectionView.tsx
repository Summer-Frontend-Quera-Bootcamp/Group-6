import ColorSelector from "@components/common/ColorSelector/index";
import { useEffect, useState } from "react";

const ColorSelectionView = (props: any) => {
    const [ColorPalette, setColorPalette] = useState("");

    useEffect(() => {
        props.setData((prevData: any) => ({
            ...prevData,
            color: ColorPalette,
        }));
        if (ColorPalette === "") setColorPalette("#208D8E");
    }, [ColorPalette]);

    return (
        <div>
            <div className="flex justify-end items-start titleDiv gap-4">
                <div className="flex flex-col items-end gap-4 w-[293px]">
                    <p className="text-sm font-normal capitalize">
                        رنگ ورک اسپیس
                    </p>
                    <div className="flex flex-row items-center justify-center flex-wrap w-[293px]">
                        <ColorSelector
                            colorPalette={ColorPalette}
                            setColorPalette={setColorPalette}
                            classNames="flex-wrap flex-row-reverse"
                        />
                    </div>
                </div>
                <div
                    className="ColorBox flex items-center justify-center rounded-lg text-2xl text-white leading-8 font-extrabold capitalize "
                    style={{ backgroundColor: ColorPalette }}
                >
                    ت ط
                </div>
            </div>
        </div>
    );
};
export default ColorSelectionView;
