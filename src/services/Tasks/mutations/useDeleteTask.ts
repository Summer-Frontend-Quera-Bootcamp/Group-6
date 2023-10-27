import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { ITasksRequest } from "@/types/api.types";

const fetcher = (data: ITasksRequest): Promise<any> => {
    const { space_id, project_id, board_id, task_id } = data;
    try {
        return AXIOS.delete(
            `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/${task_id}/`
        );
    } catch (error) {
        console.error("Error creating default boards:", error);
        throw error;
    }
};

export const useDeleteTask = () => {
    return useMutation<ITasksRequest, any, ITasksRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.DeleteTask,
    });
};
