import { AXIOS } from "@/config/axios";
import { APIURL } from "@/constants/api";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IUpdatePassword } from "@/types/api.types";

const fetcher = (data: IUpdatePassword): Promise<IUpdatePassword> =>
    AXIOS.put(APIURL.ChangePassword, data).then((res) => res.data);

export const UseChangePass = () => {
    return useMutation<IUpdatePassword, any, IUpdatePassword, any>(fetcher, {
        mutationKey: ReactQueryKeys.ChangePassword,
    });
};
