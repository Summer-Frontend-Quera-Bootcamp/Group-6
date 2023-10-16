import { useMutation } from "react-query";
import { AXIOS } from "@/config/axios";
import { APIURL } from "@/constants/api";
import { IUpdateRequest, IUpdateResponse } from "@/types/api.types";
import { ReactQueryKeys } from "../keys";
import { getUserIDFromCookies } from "@/utils/apiFunctions";

const fetcher = (data: IUpdateRequest): Promise<IUpdateResponse> => {
    const user_id = getUserIDFromCookies();
    return AXIOS.patch(`${APIURL.Update}${user_id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => res.data);
};

export const UseUpdateMutation = () => {
    return useMutation<IUpdateResponse, any, IUpdateRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.Update,
    });
};
