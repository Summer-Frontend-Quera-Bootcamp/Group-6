import { AxiosResponse } from "axios";
import { authApi } from "../api";
import Cookies from "js-cookie";

interface IRegisterData {
    username: string;
    email: string;
    password: string;
}

interface ILoginData {
    username: string;
    password: string;
}

export async function registerAccount(userData: IRegisterData) {
    try {
        const response: AxiosResponse = await authApi.post(
            "/accounts/",
            userData
        );
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function loginAccount(userData: ILoginData) {
    try {
        const response: AxiosResponse = await authApi.post(
            "/accounts/login/",
            userData
        );

        const data = response.data;

        if (data && data.refresh && data.access && data.user_id) {
            Cookies.set("refreshToken", data.refresh, {
                secure: true,
                sameSite: "none",
            });
            Cookies.set("accessToken", data.access, {
                secure: true,
                sameSite: "none",
            });

            return data;
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}
