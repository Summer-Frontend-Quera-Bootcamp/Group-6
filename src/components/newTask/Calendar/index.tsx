import { forwardRef, useEffect, useState } from "react";

import { SubmitBtn } from "@/components/common";
import { IModalsStatus } from "@/types/newTask.types";

import { Calendar, DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";

import "@assets/styles/calendar.css";
import { CalendarHeader } from "./CalendarHeader";
import { WeekDayList } from "./WeekDayList";
import { ITasksRequest } from "@/types/api.types";

interface ICalendarForm {
    setShowModal: React.Dispatch<React.SetStateAction<IModalsStatus>>;
    setTaskData: React.Dispatch<React.SetStateAction<ITasksRequest>>;
}

const CalendarForm = forwardRef<HTMLDivElement, ICalendarForm>(
    ({ setShowModal, setTaskData }, ref) => {
        const [startDate, setStartDate] = useState<DateObject>();
        const [endDate, setEndDate] = useState<DateObject>();

        const handleDateChange = (e: DateObject[]) => {
            //*  تاریخ شروع و پایان تسک در این تابع هندل میشود
            setStartDate(e[0]);
            setEndDate(e[1]);
        };

        const closeModal = () => {
            //* تمامی مودال های باز با فراخوانی این تابع بسته میشوند
            setShowModal({
                flags: false,
                tags: false,
                calendar: false,
            });
        };

        useEffect(() => {
            const date = endDate;
            if (date)
                setTaskData((prev: any) => ({
                    ...prev,
                    deadline: date
                        .convert(gregorian, gregorian_en)
                        .format("YYYY-MM-DD"),
                }));
        }, [endDate]);

        return (
            <div
                ref={ref}
                className="modal bg-inherit rounded-[20px] z-10 shadow-newTask p-5"
            >
                <div className="flex flex-col">
                    <CalendarHeader
                        startDate={startDate || ""}
                        endDate={endDate?.convert(persian, persian_fa) || ""}
                    />
                    <hr className="bg-gray-300" />
                    <div className="w-full flex self-end justify-between gap-4">
                        <div className="px-8 pt-7 flex flex-col gap-2">
                            <Calendar
                                weekDays={[
                                    "شنبه",
                                    "یکشنبه",
                                    "دوشنبه",
                                    "سه شنبه",
                                    "چهارشنبه",
                                    "پنج شنبه",
                                    "جمعه",
                                ]}
                                className="calendar"
                                onChange={handleDateChange}
                                range
                                calendar={persian}
                                locale={persian_fa}
                                value={startDate}
                            />
                            <SubmitBtn
                                className="self-baseline w-[125px] h-l py-[4px] px-[7px] text-center"
                                value="بستن"
                                onSubmit={closeModal}
                                type="button"
                            />
                        </div>
                        <WeekDayList changeDate={setStartDate} />
                    </div>
                </div>
            </div>
        );
    }
);

export default CalendarForm;
