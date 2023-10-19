import { AXIOS } from "@/config/axios";
import { APIURL } from "@/constants/api";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IResetPassword } from "@/types/api.types";

const fetcher = (data: IResetPassword): Promise<IResetPassword> =>
    AXIOS.patch(APIURL.ResetPassword, data).then((res) => res.data);

export const UseResetPassMutation = () => {
    return useMutation<IResetPassword, any, IResetPassword, any>(fetcher, {
        mutationKey: ReactQueryKeys.ResetPassword,
    });
};