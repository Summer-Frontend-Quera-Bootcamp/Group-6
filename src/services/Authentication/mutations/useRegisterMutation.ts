import { AXIOS } from "@/config/axios";
import { APIURL } from "@/constants/api";
import { IRegisterRequest, IRegisterResponse } from "@/types/api.types";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";

const fetcher = (data: IRegisterRequest): Promise<IRegisterResponse> =>
    AXIOS.post(APIURL.Register, data).then((res) => res.data);

export const UseRegisterMutation = () => {
    return useMutation<IRegisterResponse, any, IRegisterRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.Register,
    });
};
