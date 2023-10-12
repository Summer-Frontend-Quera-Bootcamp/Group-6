import { forwardRef, useState } from "react";

import { SubmitBtn } from "@/components/common";
import { IModalsStatus } from "@/types/newTask.types";

import type { Value } from "react-multi-date-picker";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";

import "@assets/styles/calendar.css";
import { CalendarHeader } from "./CalendarHeader";
import { WeekDayList } from "./WeekDayList";

interface ICalendarForm {
    setShowModal: React.Dispatch<React.SetStateAction<IModalsStatus>>;
}

const CalendarForm = forwardRef<HTMLDivElement, ICalendarForm>(
    ({ setShowModal }, ref) => {
        const [startDate, setStartDate] = useState<Value>("");
        const [endDate, setEndDate] = useState<Value>("");

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

        return (
            <div
                ref={ref}
                className="modal bg-inherit rounded-[20px] z-10 shadow-newTask p-5"
            >
                <div className="flex flex-col">
                    <CalendarHeader startDate={startDate} endDate={endDate} />
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
