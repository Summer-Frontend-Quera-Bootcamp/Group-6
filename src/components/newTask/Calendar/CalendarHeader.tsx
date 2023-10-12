import { CalendarIcon } from "@/assets/pages/newTask";
import { Value } from "react-multi-date-picker";

interface CalendarHeaderProps {
    startDate: Value;
    endDate: Value;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    startDate,
    endDate,
}) => {
    //* تابع کمکی برای فرمت کردن نوشته های هدر تقویم
    const formatDateText = (date: Value, label: string) =>
        `${label} ${date ? date : ""}`;

    return (
        <div className="flex justify-between items-center pt-[51px] pb-[29px] px-[20px]">
            <div className="flex w-[438px] justify-end items-center gap-xs">
                <p className="text-body-xl font-[500]">
                    {formatDateText(endDate, "زمان پایان")}
                </p>
                <img src={CalendarIcon} alt="calendarIcon" />
            </div>
            <div className="flex w-[438px] justify-end items-center gap-xs">
                <p className="text-body-xl font-[500]">
                    {formatDateText(startDate, "زمان شروع")}
                </p>
                <img src={CalendarIcon} alt="calendarIcon" />
            </div>
        </div>
    );
};
