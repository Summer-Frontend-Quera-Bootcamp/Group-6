import React from "react";
import { IUserDetailProps } from "@/types/newTask.types";
import { UserIcon } from "@/assets/pages/newTask";

const TaskDetail: React.FC<IUserDetailProps> = ({ spaceName }) => {
    return (
        <div className="flex justify-end items-center gap-xs self-stretch">
            <img src={UserIcon} alt="userIcon" className="cursor-pointer" />
            <p className="text-body-m">برای</p>
            <div className="flex w-[158px] py-[4px] px-xs justify-end items-center gap-[10px] rounded-[6px] border-[1px] border-[#E9EBF0]">
                <p className="text-body-m">{spaceName}</p>
            </div>
            <p className="text-body-m">در</p>
        </div>
    );
};

export { TaskDetail };
