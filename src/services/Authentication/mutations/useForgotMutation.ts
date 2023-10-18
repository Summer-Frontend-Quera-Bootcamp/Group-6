import { AXIOS } from "@/config/axios";
import { APIURL } from "@/constants/api";
import { IForgotPassword } from "@/types/api.types";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
// import { IUserState } from "@/context/types/context.type";

const fetcher = (data: IForgotPassword): Promise<IForgotPassword> =>
    AXIOS.post(APIURL.ForgotPassword, data).then((res) => res.data);

export const UseForgotMutation = () => {
    return useMutation<IForgotPassword, any, IForgotPassword, any>(fetcher, {
        mutationKey: ReactQueryKeys.ForgotPassword,
    });
};
