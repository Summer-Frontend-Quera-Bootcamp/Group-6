import { CloseIcon } from "@/assets/pages/newTask";
import FlagIcon from "./FlagIcon";
import { ITasksRequest } from "@/types/api.types";
import { useEffect, useState } from "react";

interface IFlagsProps {
    taskData: ITasksRequest;
    setTaskData: React.Dispatch<React.SetStateAction<ITasksRequest>>;
}
interface FlagItem {
    label: string;
    value: number;
    color: string;
}
export const Flags: React.FC<IFlagsProps> = ({ taskData, setTaskData }) => {
    const [selectedFlag, setSelectedFlag] = useState<FlagItem>();

    const priorities: FlagItem[] = [
        { label: "فوری", value: 1, color: "#FB0606" },
        { label: "بالا", value: 2, color: "#FFE605" },
        { label: "متوسط", value: 3, color: "#09DBCE" },
        { label: "پایین", value: 4, color: "#B2ACAC" },
    ];

    const handleFlagClick = (flag: FlagItem) => {
        setTaskData((prev: any) => ({
            ...prev,
            priority: flag.value,
        }));
        setSelectedFlag(flag);
    };

    const handleFlagRemoval = () => {
        setTaskData((prev: any) => ({
            ...prev,
            priority: 5,
        }));
        setSelectedFlag(undefined);
    };

    useEffect(() => {
        if (taskData.priority) {
            setTaskData((prev: any) => ({
                ...prev,
                priority: taskData.priority,
            }));
            const flag = priorities.find(
                (flag) => flag.value === taskData.priority
            );
            setSelectedFlag(flag);
        }
    }, []);

    return (
        <div className="inline-flex flex-col p-xs items-end gap-s rounded-[8px] shadow-newTag z-1000 absolute bg-inherit bottom-[61px] right-[-15px]">
            <div className="flex flex-col items-start gap-xs">
                {priorities.map((priority) => {
                    return (
                        <div
                            key={priority.value}
                            className="flex justify-end items-center gap-xs w-[142px] cursor-pointer"
                            onClick={() => handleFlagClick(priority)}
                        >
                            <p
                                className={`text-body-s w-full text-right p-[2px] rounded-sm ${
                                    priority === selectedFlag
                                        ? "text-white"
                                        : ""
                                }`}
                                style={{
                                    backgroundColor:
                                        priority.value === selectedFlag?.value
                                            ? priority.color
                                            : "",
                                }}
                            >
                                {priority.label}
                            </p>
                            <FlagIcon priority={priority.value} />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-end items-center gap-xs">
                <p
                    className="text-body-s text-[#534D60]  cursor-pointer"
                    onClick={handleFlagRemoval}
                >
                    حذف اولویت
                </p>
                <img src={CloseIcon} alt="close icon" />
            </div>
        </div>
    );
};
