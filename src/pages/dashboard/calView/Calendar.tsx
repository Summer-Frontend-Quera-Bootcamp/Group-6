import useClickOutside from "@/hooks/useClickOutside";
import { updateTasks } from "@/utils/newTaskFunctions";
import useQueryParams from "@/utils/useQueryParams";
import { useEffect, useRef, useState } from "react";
import AddTask from "../../../components/dashboard/Calendar/AddTask";
import FullCal from "../../../components/dashboard/Calendar/FullCal";
import WeekDays from "../../../components/dashboard/Calendar/WeekDays";

function Calendar() {
    const [events, setEvents] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState<any>();
    const [showModal, setShowModal] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const { space, project } = useQueryParams();

    useEffect(() => {
        if (space && project) {
            updateTasks(space, project, setEvents);
        }
    }, [space, project]);

    const modal = useRef<HTMLDivElement>(null);
    useClickOutside([modal], () => setShowModal(false));

    return (
        <div className="flex flex-col w-full overflow-hidden pr-[16px] z-[10]">
            {showModal && (
                <div ref={modal}>
                    <AddTask
                        x={clickPosition.x}
                        y={clickPosition.y}
                        date={selectedDate || ""}
                    />
                </div>
            )}
            <WeekDays />
            <FullCal
                setSelectedDate={setSelectedDate}
                setClickPosition={setClickPosition}
                setShowModal={setShowModal}
                events={events}
            />
        </div>
    );
}

export default Calendar;
