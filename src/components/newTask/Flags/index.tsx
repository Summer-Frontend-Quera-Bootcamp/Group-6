import { CloseIcon } from "@/assets/pages/newTask";
import FlagIcon from "./FlagIcon";
import { ITasksRequest } from "@/types/api.types";
import { useState } from "react";

interface IFlagsProps {
    setTaskData: React.Dispatch<React.SetStateAction<ITasksRequest>>;
}
interface FlagItem {
    label: string;
    value: number;
}
export const Flags: React.FC<IFlagsProps> = ({ setTaskData }) => {
    const [selectedFlag, setSelectedFlag] = useState<FlagItem>();

    const priorities: FlagItem[] = [
        { label: "فوری", value: 1 },
        { label: "بالا", value: 2 },
        { label: "متوسط", value: 3 },
        { label: "پایین", value: 4 },
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

    return (
        <div className="inline-flex flex-col p-xs items-end gap-s rounded-[8px] shadow-newTag z-1000 absolute bg-inherit bottom-[61px] right-[-15px]">
            {selectedFlag && (
                <>
                    <div
                        className="flex justify-end items-center gap-xs w-[142px] cursor-pointer"
                        onClick={() => handleFlagRemoval()}
                    >
                        <p className="text-body-s">{selectedFlag.label}</p>
                        <FlagIcon priority={selectedFlag.value} />
                    </div>
                    <hr className="w-full bg-black" />
                </>
            )}
            <div className="flex flex-col items-start gap-xs">
                {priorities.map((priority) => {
                    return (
                        <div
                            key={priority.value}
                            className="flex justify-end items-center gap-xs w-[142px] cursor-pointer"
                            onClick={() => handleFlagClick(priority)}
                        >
                            <p className="text-body-s">{priority.label}</p>
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
