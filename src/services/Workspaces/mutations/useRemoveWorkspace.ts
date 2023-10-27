import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IWorkspaceRemoveData } from "@/types/api.types";

const fetcher = (data: IWorkspaceRemoveData): Promise<IWorkspaceRemoveData> => {
    const { space_id } = data;
    return AXIOS.delete(`/workspaces/${space_id}/`).then((res) => res.data);
};

export const useRemoveWorkspace = () => {
    return useMutation<IWorkspaceRemoveData, any, IWorkspaceRemoveData, any>(
        fetcher,
        {
            mutationKey: ReactQueryKeys.DeleteWorkspace,
        }
    );
};
