import { getTasks } from "@/services/Tasks";
import { ITasksRequest, ITasksResponse } from "@/types/api.types";
import { toast } from "react-toastify";

interface Event {
    id: string;
    title: string;
    description: string;
    start: string;
}

export const onInputChange = (
    event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    stateHanlder: React.Dispatch<React.SetStateAction<ITasksRequest>>
) => {
    const { name, value } = event.target;
    stateHanlder((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

export const onFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    stateHanlder: React.Dispatch<React.SetStateAction<ITasksRequest>>
) => {
    const { name, files } = event.target;
    stateHanlder((prevData) => ({
        ...prevData,
        [name]: files?.[0],
    }));
};

export const updateTasks = async (
    space: string,
    project: string,
    setEvents: (value: any) => void
) => {
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
        const formattedEvents: Event[] = Object.entries(latestTasks).flatMap(
            ([date, tasks]) => {
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
            }
        );
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
