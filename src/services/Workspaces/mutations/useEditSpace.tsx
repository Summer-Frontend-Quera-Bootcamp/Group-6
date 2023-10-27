import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ITasksRequest } from "@/types/api.types";
import { ReactQueryKeys } from "../keys";

const fetcher = (data: ITasksRequest): Promise<any> => {
    const { space_id, ...projectData } = data;
    try {
        return AXIOS.patch(`/workspaces/${space_id}/`, projectData);
    } catch (error) {
        console.error("Error creating default boards:", error);
        throw error;
    }
};

export const useEditSpace = () => {
    return useMutation<ITasksRequest, any, ITasksRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.EditWorkspace,
    });
};
