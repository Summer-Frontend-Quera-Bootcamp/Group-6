import { AXIOS } from "@/config/axios";
import { getLastBoard } from "../boards";

export const getLatestOrder = async (
    space_id: number,
    project_id: number,
    board_id: number
) => {
    try {
        const response = await AXIOS.get(
            `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/`
        );

        const tasks = response.data;

        if (tasks.length > 0) {
            const lastTask = tasks[tasks.length - 1];
            const lastTaskOrder = lastTask.order;
            return lastTaskOrder;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching latest task order:", error);
        throw error;
    }
};

export const getTasks = async (
    space_id: number,
    project_id: number,
    board_id?: number
) => {
    try {
        const lastBoardId =
            board_id || (await getLastBoard(space_id, project_id))?.id;

        if (!lastBoardId) {
            throw new Error("No board_id or valid last_board found.");
        }

        const tasksResponse = await fetchTasks(
            space_id,
            project_id,
            lastBoardId
        );
        const taskData = tasksResponse.data;

        return { board_id: lastBoardId, taskData };
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

const fetchTasks = async (
    space_id: number,
    project_id: number,
    board_id: number
) => {
    const URL = `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/`;
    console.log("sending", URL);

    const tasksResponse = await AXIOS.get(URL);
    return tasksResponse;
};

export const getTask = async (
    space_id: number,
    project_id: number,
    board_id: number = 21,
    task_id: number
) => {
    try {
        const tasksResponse = await AXIOS.get(
            `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/${task_id}/`
        );
        return tasksResponse.data;
    } catch (error) {
        console.error("Error fetching latest tasks:", error);
        throw error;
    }
};
