import axios from "axios";
import Cookies from "js-cookie";

export const authApi = axios.create({
    baseURL: "https://quera.iran.liara.run/",
    headers: {},
});

authApi.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    async (error) => {
        handleResponseError(error);
    }
);

export async function handleResponseError(error: any) {
    if (error.response && error.response.status === 401) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken) {
                Cookies.set("accessToken", newAccessToken, {
                    secure: true,
                    sameSite: "none",
                });
                console.log("new access", newAccessToken);
            }
        }
    }
    return Promise.reject(error);
}

function getRefreshToken() {
    return Cookies.get("refreshToken");
}

async function refreshAccessToken(refreshToken: string) {
    try {
        const response = await authApi.post("/accounts/refresh/", {
            refresh: refreshToken,
        });
        console.log("refreshed", response.data.access);

        return response.data.access;
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        return null;
    }
}
