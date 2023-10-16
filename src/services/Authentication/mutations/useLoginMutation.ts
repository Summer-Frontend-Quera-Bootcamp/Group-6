import { AXIOS } from "@/config/axios";
import { APIURL } from "@/constants/api";
import { ILoginRequest } from "@/types/api.types";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IUserState } from "@/context/types/context.type";

const fetcher = (data: ILoginRequest): Promise<IUserState> =>
    AXIOS.post(APIURL.Login, data).then((res) => res.data);

export const UseLoginMutation = () => {
    return useMutation<IUserState, any, ILoginRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.Login,
    });
};
