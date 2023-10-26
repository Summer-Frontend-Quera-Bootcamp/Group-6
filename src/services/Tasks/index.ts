import { AXIOS } from "@/config/axios";
import { fetchBoards } from "../boards";
import { AxiosResponse } from "axios";

export const getLatestOrder = async (
    space_id: number,
    project_id: number,
    board_id: number = 21
) => {
    try {
        const tasksResponse = await AXIOS.get(
            `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/`
        );
        const lastTask = tasksResponse.data[tasksResponse.data.length - 1];
        const lastTaskOrder = lastTask.order;

        return lastTaskOrder;
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
        if (!board_id) {
            const { boards } = await fetchBoards(space_id, project_id);
            board_id = boards[boards.length - 1]?.id;
        }
        if (board_id) {
            const tasksResponse: AxiosResponse<any> = await AXIOS.get(
                `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/`
            );
            const taskData = tasksResponse.data;

            return { board_id, taskData };
        } else {
            throw new Error("no board found");
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
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
