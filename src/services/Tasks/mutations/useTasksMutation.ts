import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { ITasksRequest, ITasksResponse } from "@/types/api.types";

const fetcher = (data: ITasksRequest): Promise<ITasksResponse> => {
    const { project, board, ...taskData } = { ...data };

    if (!project) {
        return Promise.reject("Project is undefined");
    }

    const space_id = project.idx;
    const project_id = project.id;
    const board_id = board || 21;
    const API_PATH = `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/`;

    const taskResponse = AXIOS.post(API_PATH, taskData, {
        headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => res.data);

    return taskResponse;
};

export const useTasksMutation = () => {
    return useMutation<ITasksResponse, any, ITasksRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.Tasks,
    });
};
