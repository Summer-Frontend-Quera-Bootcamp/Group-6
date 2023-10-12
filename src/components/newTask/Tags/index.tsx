import { useState, useEffect, useRef } from "react";
import { DotsIcon, SearchIcon } from "@/assets/pages/newTask";
import { MessageDisplay } from "@/components/common";
import { useTags } from "@/context/TagsContext";
import { TagLabel } from "./TagLabel";
import { MESSAGE_TEXT } from "@/constants";
import { TagTypes } from "@/types/newTask.types";
import { ITagsContext } from "@/types/tags.types";

export const Tags: React.FC = () => {
    const [showTags, setShowTags] = useState(true);
    const {
        tags,
        loadTags,
        addTag,
        selectedTag,
        message,
        inputValue,
        editState,
        editTag,
        updateMessage,
        changeInputValue,
    }: ITagsContext = useTags();

    const tagInput = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        //* Context و ذخیره آن در API دریافت اطلاعات از
        try {
            await loadTags();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCreateNewTag = async (tagName: string) => {
        //* ارسال می کند API این تابع با دریافت تگ وارد شده، آن را برای اضافه شدن به
        try {
            changeInputValue("");
            setShowTags(true);
            await addTag(tagName);
        } catch (error) {
            console.error("Error creating new tag:", error);
        }
    };

    const handleEditTag = async (tagName: string) => {
        //* ارسال می کند API این تابع با دریافت تگ وارد شده، آن را برای ویرایش به
        updateMessage("info", MESSAGE_TEXT.EDITING_TAG);
        try {
            changeInputValue("");
            if (editState) await editTag(editState, { name: tagName });
        } catch (error) {
            console.error("Error editing new tag:", error);
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        //* بعد از ولیدیشن، توابع مورد نیاز (ادیت/اضافه) فراخوانی میشوند Enter با فشرده شدن
        if (e.key === "Enter") {
            const tagName = tagInput.current?.value;
            if (!tagName || tagName?.length === 0)
                throw new Error("Please enter a value for tag");

            if (editState) handleEditTag(tagName);
            else handleCreateNewTag(tagName);

            tagInput.current?.blur();
        }
    };

    useEffect(() => {
        //* دریافت میشوند API با هر بار باز شدن مودال تگ ها، داده ها از
        fetchData();
    }, []);

    return (
        <div className="inline-flex flex-col p-xs items-end gap-s rounded-[8px] shadow-newTag z-1000 absolute bottom-[61px] right-[112px] bg-inherit">
            <div>{selectedTag && <TagLabel tag={selectedTag} />}</div>

            <div className="flex py-[4px] px-xs justify-end items-center gap-xs self-stretch rounded-[4px]">
                <input
                    type="text"
                    ref={tagInput}
                    placeholder="جستجو یا ساختن تگ"
                    className="text-body-xs placeholder-[#534D60] text-right outline-none bg-inherit w-[112px] pr-[2px]"
                    onClick={() => setShowTags(false)}
                    onKeyDown={handleKeyDown}
                    dir="rtl"
                    value={inputValue}
                    onChange={(e) => changeInputValue(e.target.value)}
                    onBlur={() => setShowTags(true)}
                />
                <img
                    src={SearchIcon}
                    alt="searchIcon"
                    className="w-[24px] h-[24px]"
                />
            </div>

            <div className="flex flex-col justify-center items-end gap-[12px] w-full bg-inherit">
                {message?.msg && (
                    <MessageDisplay
                        messages={message.msg}
                        type={message.type}
                    />
                )}
                {!showTags && (
                    <div className="flex justify-between items-center self-stretch">
                        <p className="text-body-xs text-center ">
                            برای ساختن/ادیت تگ جدید اینتر بزنید
                        </p>
                    </div>
                )}
                {/* باشد، تگ ها نمایش داده می شوند showTags دریافت شده باشند و مودال در حالت API اگر تگ ها از */}
                {tags &&
                    showTags &&
                    tags.map((tag: TagTypes) => (
                        <TagLabel key={tag.id} tag={tag} icon={DotsIcon} />
                    ))}
            </div>
        </div>
    );
};
