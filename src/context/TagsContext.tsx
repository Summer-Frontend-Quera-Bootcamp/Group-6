import { MESSAGE_TEXT } from "@/constants";
import { getTags, updateTags } from "@/services/Tags";
import { TagTypes } from "@/types/newTask.types";
import { IMessage, ITagsContext, ITagsContextProps } from "@/types/tags.types";
import React, { useContext, useState } from "react";
import * as UUID from "uuid";

const TagsContext = React.createContext({} as ITagsContext);

export const useTags = (): ITagsContext => {
    return useContext(TagsContext);
};

export const TagsProvider = ({ children }: ITagsContextProps) => {
    const [tags, setTags] = useState<TagTypes[]>([]);
    const [selectedTag, setSelectedTag] = useState<TagTypes | null>(null);
    const [message, setMessage] = useState<IMessage | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [editState, setEditState] = useState<undefined | string>();

    const loadTags = async () => {
        //* tags و ذخیره آنها در API دریافت تگ ها از
        if (tags.length === 0) updateMessage("info", MESSAGE_TEXT.LOADING);

        try {
            const response = await getTags();
            setTags(response.record);
            clearMessage(0);
        } catch (error) {
            updateMessage("error", MESSAGE_TEXT.ERROR_FETCHING_DATA, 2000);
            console.error("Error fetching data:", error);
        }
    };

    const addTag = async (tag: string) => {
        //* API اضافه کردن تگ دریافتی با مقدار پیش فرض به
        updateMessage("info", MESSAGE_TEXT.CREATING_TAG);

        const newTag: TagTypes = {
            id: UUID.v4(),
            name: tag,
            fgColor: "#FFFF",
            bgColor: "#228BE6",
        };

        try {
            await updateTags([...tags, newTag]);
            await loadTags();
            selectTag(newTag);
            updateMessage("success", MESSAGE_TEXT.TAG_CREATED, 2000);
            return newTag;
        } catch (error) {
            updateMessage("error", MESSAGE_TEXT.ERROR_CREATING_TAG);
            console.error("Failed to add and update tag:", error);
            throw new Error("Failed to update tags");
        }
    };

    const removeTag = async (id: string) => {
        //* API حذف تگ با آیدی دریافتی از
        updateMessage("info", MESSAGE_TEXT.DELETING_TAG);

        const updatedTags = tags.filter((tag) => tag.id !== id);
        try {
            await updateTags(updatedTags);
            await loadTags();

            if (selectedTag?.id === id) selectTag();
        } catch (error) {
            updateMessage("error", MESSAGE_TEXT.ERROR_CREATING_TAG);
        }
    };

    const editTag = async (id: string, newProps: TagTypes) => {
        //* API ادیت تگ با آیدی دریافتی و مقادیر جدید در
        const updatedTags = tags.map((tag) => {
            if (tag.id === id) return { ...tag, ...newProps };
            return tag;
        });

        try {
            await updateTags(updatedTags);
            await loadTags();

            changeInputValue("");
            changeState();
            clearMessage(0);
        } catch (error) {
            console.error(error);
            updateMessage("error", MESSAGE_TEXT.ERROR_CREATING_TAG);
        }
    };

    const selectTag = (tag: TagTypes | null = null) => {
        //* انتخاب تگ ورودی به عنوان تگ منتخب
        if (selectedTag === tag) setSelectedTag(null);
        else setSelectedTag(tag);
    };

    //* تغییر مقدار input تگ ها برای ادیت/اضافه
    const changeInputValue = (text: string) => setInputValue(text);

    const updateMessage = (
        type: "info" | "error" | "success",
        msg: string,
        time?: number
    ) => {
        //* آپدیت کردن پیغام به کاربر با متن و تایپ جدید
        setMessage({ type: type, msg: msg });
        //* در صورت دریافت زمان، جعبه پیغام بعد از زمان داده شده بسته خواهد شد
        if (time) clearMessage(time);
    };

    const clearMessage = (time = 2000) => {
        //* بعد از زمان داده شده، پیغام ها پاک می شوند
        setTimeout(() => {
            setMessage(null);
        }, time);
    };

    const changeState = (id?: string) => {
        //* حالت مناسب را برای اضافه/ادیت تگ ها انتخاب میکند
        if (id) setEditState(id);
        else setEditState(undefined);
    };

    return (
        <TagsContext.Provider
            value={{
                tags,
                message,
                editState,
                inputValue,

                addTag,
                editTag,
                loadTags,
                removeTag,
                selectTag,
                changeState,
                selectedTag,
                clearMessage,
                updateMessage,
                changeInputValue,
            }}
        >
            {children}
        </TagsContext.Provider>
    );
};
