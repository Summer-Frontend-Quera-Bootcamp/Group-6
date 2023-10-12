import { ITagLabelProps, TagTypes } from "@/types/newTask.types";
import { OptionMenu } from "./TagOptions";
import { useTags } from "@/context/TagsContext";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

export const TagLabel: React.FC<ITagLabelProps> = ({ tag, icon }) => {
    const [showTagOptions, setShowTagOptions] = useState<TagTypes | null>(null);
    const { selectTag }: any = useTags();
    const optionsRef = useRef(null);

    const handleSelection = () => {
        //* تگ داده شده را به عنوان تگ منتخب قرار میدهد
        selectTag(tag);
    };

    useClickOutside([optionsRef], () => {
        //* در صورت کلیک خارج از مودال دریافتی، مودال بسته خواهد شد
        if (handleModalClose) handleModalClose(tag);
    });

    const handleOptionClick = (newTag: TagTypes) => {
        //* ولیدیشن انتخاب تگ منتخب
        if (showTagOptions?.name === newTag.name) {
            //* اگر تگ از قبل انتخاب شده باشد، از حالت انتخاب خارج میشود
            setShowTagOptions(null);
        } else {
            setShowTagOptions(newTag);
        }
    };

    const handleModalClose = (newTag: TagTypes) => {
        //* در صورت فراخوانی، مودال مربوط به تگ ورودی بسته میشود
        if (showTagOptions?.name === newTag.name) {
            setShowTagOptions(null);
        }
    };
    return (
        <div className="flex justify-between items-center self-stretch relative z-[50] bg-inherit ">
            <div className="flex flex-col relative cursor-pointer">
                {icon && handleOptionClick && (
                    <img
                        src={icon}
                        alt="dotsIcon"
                        onClick={() => handleOptionClick(tag)}
                    />
                )}
                <span ref={optionsRef}>
                    {showTagOptions && showTagOptions?.id === tag.id && (
                        <OptionMenu tag={showTagOptions} />
                    )}
                </span>
            </div>
            <button
                className={`flex h-[24px] px-xs justify-center items-center rounded-[14px] cursor-pointer text-bold-xs font-[800] `}
                style={{ backgroundColor: tag.bgColor, color: tag.fgColor }}
                onClick={() => handleSelection()}
                dir="rtl"
            >
                {tag.name}
            </button>
        </div>
    );
};
