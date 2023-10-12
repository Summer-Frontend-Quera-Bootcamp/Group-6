import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IDynamicDateEntry } from "@/types/newTask.types";

export const getDynamicDates = (): IDynamicDateEntry[] => {
    //* returns an object containing Dates intended for the calendar component

    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const thisWeekend = new Date(today);
    const daysUntilThisFriday = (5 - today.getDay() + 7) % 7; //* Calculations for finding this Weekend
    thisWeekend.setDate(today.getDate() + daysUntilThisFriday);

    const nextWeekend = new Date(today);
    nextWeekend.setDate(thisWeekend.getDate() + 7);

    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14);

    const fourWeeksLater = new Date(today);
    fourWeeksLater.setDate(today.getDate() + 28);

    const dates: IDynamicDateEntry[] = [
        {
            title: "امروز",
            date: new DateObject({
                date: today,
                calendar: persian,
                locale: persian_fa,
            }),
        },
        {
            title: "فردا",
            date: new DateObject({
                date: tomorrow,
                calendar: persian,
                locale: persian_fa,
            }),
        },
        {
            title: "این آخر هفته",
            date: new DateObject({
                date: thisWeekend,
                calendar: persian,
                locale: persian_fa,
            }),
        },
        {
            title: "هفته آینده",
            date: new DateObject({
                date: nextWeek,
                calendar: persian,
                locale: persian_fa,
            }),
        },
        {
            title: "آخر هفته آینده",
            date: new DateObject({
                date: nextWeekend,
                calendar: persian,
                locale: persian_fa,
            }),
        },
        {
            title: "دو هفته دیگر",
            date: new DateObject({
                date: twoWeeksLater,
                calendar: persian,
                locale: persian_fa,
            }),
        },
        {
            title: "چهار هفته دیگر",
            date: new DateObject({
                date: fourWeeksLater,
                calendar: persian,
                locale: persian_fa,
            }),
        },
    ];

    return dates;
};
