import React from "react";

const TextArea: React.FC = () => {
    return (
        <textarea
            title="توضیحات تسک"
            className="flex h-[191px] pt-[19px] pr-l justify-end items-center self-stretch rounded-[12px] border-[1px] border-[#E2E2E2] bg-inherit placeholder-[#AEAEAE] plac text-right outline-none"
            placeholder={"توضیحاتی برای این تسک بنویسید"}
            dir="rtl"
        />
    );
};

export { TextArea };
