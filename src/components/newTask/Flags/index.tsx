import { CloseIcon } from "@/assets/pages/newTask";
import FlagIcon from "./FlagIcon";

export const Flags: React.FC = () => {
    //* اولویت تسک ها همراه با عدد نشان دهنده اولویت ها
    const priorities = [
        { label: "فوری", value: 1 },
        { label: "بالا", value: 2 },
        { label: "متوسط", value: 3 },
        { label: "پایین", value: 4 },
    ];

    return (
        <div className="inline-flex flex-col p-xs items-end gap-s rounded-[8px] shadow-newTag z-1000 absolute bg-inherit bottom-[61px] right-[-15px]">
            <div className="flex flex-col items-start gap-xs">
                {priorities.map((priority) => (
                    <div
                        key={priority.value}
                        className="flex justify-end items-center gap-xs  w-[142px]"
                    >
                        <p className="text-body-s">{priority.label}</p>
                        <FlagIcon priority={priority.value} />
                    </div>
                ))}
            </div>
            <div className="flex justify-end items-center gap-xs">
                <p className="text-body-s text-[#534D60]">حذف اولویت</p>
                <img src={CloseIcon} alt="close icon" />
            </div>
        </div>
    );
};
