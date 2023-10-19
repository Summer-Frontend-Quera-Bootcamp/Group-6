import { AXIOS } from "@/config/axios";
import { APIURL } from "@/constants/api";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IThemeData } from "@/types/api.types";

const fetcher = (data: IThemeData): Promise<IThemeData> => {
    return AXIOS.post(APIURL.ChangeSetting, data).then((res) => res.data);
};

export const UseChangeTheme = () => {
    return useMutation<IThemeData, any, IThemeData, any>(fetcher, {
        mutationKey: ReactQueryKeys.Theme,
    });
};
