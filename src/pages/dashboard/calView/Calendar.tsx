import { useNewTask } from "@/context/NewTaskContext";
import useClickOutside from "@/hooks/useClickOutside";
import { getTasks } from "@/services/Tasks";
import { ITasksResponse } from "@/types/api.types";
import useQueryParams from "@/utils/useQueryParams";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import jalaliMoment from "jalali-moment";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddTask from "./AddTask";

interface Event {
    id: string;
    title: string;
    description: string;
    start: string;
}

function Calendar() {
    const [events, setEvents] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState<any>();
    const [showModal, setShowModal] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const { space, project } = useQueryParams();
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

    useEffect(() => {
        const updateTasks = async () => {
            toast.dismiss();
            toast.loading("در حال دریافت تسک ها");
            try {
                const { board_id, taskData } = await getTasks(
                    Number(space),
                    Number(project)
                );
                if (taskData.length === 0) {
                    toast.dismiss();
                    toast.info("تسکی در این بورد وجود ندارد");
                    return;
                }
                const latestTasks: Record<string, ITasksResponse[]> = {};
                taskData.forEach((task: ITasksResponse) => {
                    const taskDate = task.deadline;

                    if (!latestTasks[taskDate]) {
                        latestTasks[taskDate] = [task];
                    } else {
                        latestTasks[taskDate].push(task);
                        latestTasks[taskDate].sort(
                            (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                        );
                        if (latestTasks[taskDate].length > 2) {
                            latestTasks[taskDate].pop();
                        }
                    }
                });
                const formattedEvents: Event[] = Object.entries(
                    latestTasks
                ).flatMap(([date, tasks]) => {
                    return tasks.map((task, index) => ({
                        id: `${task.id}_${index}`,
                        title:
                            task.name.length > 17
                                ? `${task.name.slice(0, 17)}...`
                                : task.name,
                        description: task.description,
                        start: date,
                        board_id: board_id,
                    }));
                });
                toast.dismiss();
                console.log(taskData);

                toast.success("تسک ها دریافت شدند.");
                setEvents(formattedEvents);
            } catch (error) {
                toast.dismiss();
                setEvents({});
                console.error("Error fetching or formatting tasks:", error);
                toast.error("بوردی/تسکی در این پروژه وجود ندارد");
            }
        };

        if (space && project) {
            updateTasks();
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
            <ul className="flex text-right relative top-[35px] p-[2px] h-0 ">
                <li className="w-[190px]  p-1">شنبه</li>
                <li className="w-[190px]  p-1">یک شنبه</li>
                <li className="w-[190px]  p-1">دوشنبه</li>
                <li className="w-[190px]  p-1">سه شنبه</li>
                <li className="w-[190px]  p-1 ">چهار شنبه</li>
                <li className="w-[190px]  p-1">پنج شنبه</li>
                <li className="w-[190px]  p-1">جمعه</li>
            </ul>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="fa"
                // lazyFetching
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
                // headerToolbar={false}
                aspectRatio={1}
                buttonText={{ today: "امروز" }}
                buttonHints={{ today: "امروز", next: "بعدی", prev: "قبلی" }}
                dateClick={handleDateClick}
                eventClassNames={"event"}
                height={"80vh"}
                eventClick={onEventClick}
            />
        </div>
    );
}

export default Calendar;
