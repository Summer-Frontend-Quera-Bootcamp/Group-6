import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { ITasksRequest } from "@/types/api.types";

const fetcher = (data: ITasksRequest): Promise<any> => {
    const { space_id, project_id, ...projectData } = data;
    try {
        return AXIOS.patch(
            `/workspaces/${space_id}/projects/${project_id}/`,
            projectData
        );
    } catch (error) {
        console.error("Error creating default boards:", error);
        throw error;
    }
};

export const useEditProject = () => {
    return useMutation<ITasksRequest, any, ITasksRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.useEditProject,
    });
};
