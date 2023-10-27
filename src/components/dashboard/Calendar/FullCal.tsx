import { useNewTask } from "@/context/NewTaskContext";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";
import jalaliMoment from "jalali-moment";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface IFullCallProps {
    setSelectedDate: React.Dispatch<React.SetStateAction<any>>;
    setClickPosition: React.Dispatch<React.SetStateAction<any>>;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
    events: any;
}

const FullCal = ({
    setSelectedDate,
    setClickPosition,
    setShowModal,
    events,
}: IFullCallProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setShowTaskModal } = useNewTask();

    const handleDateClick = (info: DateClickArg) => {
        const clickedDate = info.dateStr;
        const persianDate = jalaliMoment(clickedDate, "YYYY-MM-DD").locale(
            "fa"
        );
        setSelectedDate(persianDate);
        setClickPosition({ x: info.jsEvent.clientX, y: info.jsEvent.clientY });
        setShowModal(true);
    };

    const onEventClick = (info: any) => {
        const eventId = info.event.id.split("_")[0];
        const board_id = info.event.extendedProps.board_id;

        const currentParams = Object.fromEntries(searchParams);
        const updatedParams = {
            ...currentParams,
            board: board_id,
            task: eventId,
            mode: "edit",
        };
        setSearchParams(updatedParams);
        setShowTaskModal(true);
    };
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="fa"
            firstDay={6}
            weekends={true}
            selectable={true}
            events={events}
            direction="rtl"
            showNonCurrentDates={true}
            viewClassNames={"CalView"}
            dayCellClassNames={"CalCell"}
            weekNumberClassNames={"CalHeader"}
            dayHeaderClassNames={"CalDayHeader"}
            fixedWeekCount={false}
            weekNumbers={false}
            aspectRatio={1}
            buttonText={{ today: "امروز" }}
            buttonHints={{ today: "امروز", next: "بعدی", prev: "قبلی" }}
            dateClick={handleDateClick}
            eventClassNames={"event"}
            height={"80vh"}
            eventClick={onEventClick}
        />
    );
};

export default FullCal;
