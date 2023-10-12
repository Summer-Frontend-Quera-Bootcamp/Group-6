import { useMemo } from "react";
import { Value } from "react-multi-date-picker";
import { getDynamicDates } from "@/utils/getDates";

interface WeekDayListProps {
    changeDate: (date: Value) => void;
}

const WeekDayList: React.FC<WeekDayListProps> = ({ changeDate }) => {
    //* تاریخ های محاسبه شده کش میشوند تا از فراخوانی بی جا تابع جلوگیری شود
    const dynamicDates = useMemo(() => getDynamicDates(), []);

    return (
        <div className="flex flex-col justify-between p-m gap-m w-72">
            {dynamicDates.map((date, index) => (
                <div
                    key={index}
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => changeDate(date.date)}
                >
                    <p className="text-body-m text-gray-primary">
                        {String(date.date)}
                    </p>
                    <p className="text-body-l">{date.title}</p>
                </div>
            ))}
        </div>
    );
};

export { WeekDayList };
