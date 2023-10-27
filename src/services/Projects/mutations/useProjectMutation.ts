import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IProjectData, IProjectDataResponse } from "@/types/api.types";

const fetcher = (data: IProjectData): Promise<IProjectDataResponse> => {
    const { space_id, ...board_data } = data;
    return AXIOS.post(`workspaces/${space_id}/projects/`, board_data).then(
        (res) => res.data
    );
};

export const UseProjectTheme = () => {
    return useMutation<IProjectDataResponse, any, IProjectData, any>(fetcher, {
        mutationKey: ReactQueryKeys.NewProject,
    });
};
