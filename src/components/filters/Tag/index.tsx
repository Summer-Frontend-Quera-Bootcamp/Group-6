import { FC } from "react";

export type ITagTitle = "درس" | "کار" | "پروژه";

interface ITagProps {
    title: ITagTitle;
}

const bgColor = {
    درس: "bg-[#EBC8C8]",
    کار: "bg-[#C3B7F2]",
    پروژه: "bg-[#7FFAFA]",
};

const Tag: FC<ITagProps> = ({ title }) => {
    return <span className={`px-2 py-[5px] ${bgColor[title]}`}>{title}</span>;
};

export default Tag;
