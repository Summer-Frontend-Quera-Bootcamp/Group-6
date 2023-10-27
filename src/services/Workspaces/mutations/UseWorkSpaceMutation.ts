import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IWorkspaceData } from "@/types/api.types";

const fetcher = (data: IWorkspaceData): Promise<IWorkspaceData> => {
    return AXIOS.post(`workspaces/`, data).then((res) => res.data);
};

export const UseWorkSpaceMutation = () => {
    return useMutation<IWorkspaceData, any, IWorkspaceData, any>(fetcher, {
        mutationKey: ReactQueryKeys.newWorkspace,
    });
};
