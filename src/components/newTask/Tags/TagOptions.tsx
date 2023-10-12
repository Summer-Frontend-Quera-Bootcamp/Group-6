import { IOptionMenuProps } from "@/types/newTask.types";
import { useTheme } from "@/context/ThemeContext";
import { CloseIcon, EditIcon, ColorIcon } from "@/assets/pages/newTask";
import { useTags } from "@/context/TagsContext";
import { MESSAGE_TEXT } from "@/constants";
import ColorSelector from "@/components/common/ColorSelector";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { ITagsContext } from "@/types/tags.types";

export const OptionMenu: React.FC<IOptionMenuProps> = ({ tag }) => {
    const [palette, setPalette] = useState<string>(tag.bgColor || "");
    const [showPalette, setShowPalette] = useState(false);
    const colorRef = useRef(null);
    const itemRef = useRef(null);

    const {
        removeTag,
        updateMessage,
        editTag,
        changeInputValue,
        changeState,
    }: ITagsContext = useTags();
    const { theme } = useTheme();

    const optionItems = ["حذف", "ویرایش تگ", "ویرایش رنگ"];
    const optionIcons = [CloseIcon, EditIcon, ColorIcon];

    //* اگر خارج از مودال های داده شده کلیک شود، مودال بسته میشود
    useClickOutside([colorRef, itemRef], () => setShowPalette(false));

    const handleEdit = async (action: number) => {
        //* اکشن موردنظر بر اساس عدد داده شده انتخاب و اجرا میشود
        switch (action) {
            case 0:
                //* اگر کاربر قصد حذف تگ داشته باشد
                updateMessage("info", MESSAGE_TEXT.DELETING_TAG);
                if (tag.id) await removeTag(tag.id);
                break;
            case 1:
                //* اگر کاربر قصد ادیت تگ را داشته باشد
                if (tag.name) changeInputValue(tag.name);
                changeState(tag.id);
                break;
            case 2:
                //* اگر کاربر قصد ادیت رنگ را داشته باشد
                setShowPalette(!showPalette);
                break;
            default:
                break;
        }
    };

    const handleColorSelection = async (color: string) => {
        //* ارسال کرده و تگ را ادیت می کند API رنگ دریافتی را برای
        setPalette(color);
        updateMessage("info", MESSAGE_TEXT.EDITING_TAG);
        if (tag.id)
            await editTag(tag.id, {
                bgColor: color,
                fgColor: "#ffff",
            });
    };

    return (
        <>
            <div
                className={`inline-flex p-xs flex-col items-end gap-s z-[100] absolute w-max right-[40px] top-[5px] shadow-newTag rounded-[8px] ${theme}`}
            >
                {showPalette && (
                    <div
                        className={`absolute bottom-10 inline-flex flex-col rounded-[8px] shadow-colorSelector justify-center items-end  gap-[11px] p-xs ${theme}`}
                        ref={colorRef}
                    >
                        <ColorSelector
                            colorPalette={palette}
                            setColorPalette={handleColorSelection}
                            classNames="grid grid-cols-5 grid-rows-3 justify-center items-center w-[148px] gap-[13px] items-center align-center justify-end"
                        />
                    </div>
                )}
                {optionItems.map((text, index) => (
                    <div
                        className="flex justify-end items-center gap-[4px] cursor-pointer"
                        key={index}
                        onClick={() => handleEdit(index)}
                        ref={itemRef}
                    >
                        <p className="text-body-xs">{text}</p>
                        <img
                            className="w-[10px] h-[10px]"
                            src={optionIcons[index]}
                            alt={text}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};
