import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IProjectRemoveData } from "@/types/api.types";

const fetcher = (data: IProjectRemoveData): Promise<IProjectRemoveData> => {
    const { space_id, project_id } = data;
    return AXIOS.delete(`/workspaces/${space_id}/projects/${project_id}/`).then(
        (res) => res.data
    );
};

export const useRemoveProject = () => {
    return useMutation<IProjectRemoveData, any, IProjectRemoveData, any>(
        fetcher,
        {
            mutationKey: ReactQueryKeys.RemoveProject,
        }
    );
};
