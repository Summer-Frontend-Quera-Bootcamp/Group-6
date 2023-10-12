import { AxiosError, AxiosResponse } from "axios";
import { authApi } from "../api";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

interface IUpdatedInfo {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    thumbnail?: string;
}

export async function getAccounts() {
    try {
        const response: AxiosResponse = await authApi.get("/accounts/");
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getAccount() {
    const token = Cookies.get("accessToken");
    if (token) {
        const user_data: any = jwt_decode(token);

        try {
            if (user_data && user_data.user_id) {
                const response: AxiosResponse = await authApi.get(
                    `/accounts/${user_data.user_id}`
                );
                const data = response.data;
                return data;
            } else {
                console.log("error");
            }
        } catch (error) {
            throw AxiosError;
        }
    }
}

export async function updateAccount(userData: IUpdatedInfo | FormData) {
    const token = Cookies.get("accessToken");
    if (token) {
        const user_data: any = jwt_decode(token);

        if (user_data && user_data.user_id) {
            try {
                const response: AxiosResponse = await authApi.patch(
                    `/accounts/${user_data.user_id}/`,
                    userData
                );
                const data = response.data;
                return data;
            } catch (error) {
                throw error;
            }
        }
    }
}
