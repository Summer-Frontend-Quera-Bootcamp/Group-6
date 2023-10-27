import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IBoardData } from "@/types/api.types";

const fetcher = (data: IBoardData): Promise<any> => {
    const { space_id, project_id, ...BoardData } = data;
    try {
        return AXIOS.post(
            `/workspaces/${space_id}/projects/${project_id}/boards/`,
            BoardData
        );
    } catch (error) {
        console.error("Error creating default boards:", error);
        throw error;
    }
};

export const useCreateBoards = () => {
    return useMutation<IBoardData, any, IBoardData, any>(fetcher, {
        mutationKey: ReactQueryKeys.CreateBoard,
    });
};
