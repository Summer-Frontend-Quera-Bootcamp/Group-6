import { SubmitBtn, ToggleTheme } from "@components/common";
import { usePalette } from "@context/PaletteContext";
import { FormEvent, useState } from "react";
import ColorSelector from "./components/ColorSelector";

const ProfileSettings = () => {
    const { palette, updatePalette }: any = usePalette();
    const [tempColor, setTempColor] = useState(palette);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updatePalette(tempColor);
        console.log(palette);
    };

    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">تنظیمات</p>
            <form
                className="flex flex-col items-end gap-m"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="flex flex-col items-end gap-xs">
                    <p>انتخاب تم</p>
                    <ColorSelector
                        colorPalette={tempColor}
                        setColorPalette={setTempColor}
                    />
                </div>
                <ToggleTheme />
                <SubmitBtn
                    value="ثبت تغییرات"
                    className="w-[354px] font-bold text-[14px]"
                />
            </form>
        </div>
    );
};

export default ProfileSettings;
