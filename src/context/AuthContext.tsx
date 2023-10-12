import { authApi, handleResponseError } from "@/services/api";
import isTokenExpired from "@/utils/tokenValidator";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IAuthContextProps {
    children: React.ReactNode;
}

export interface IAuthContext {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    authenticateUser: () => void;
}

const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: IAuthContextProps) => {
    const [accessToken, setAccessToken] = useState<string | null>(
        Cookies.get("accessToken") || null
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        Cookies.get("refreshToken") || null
    );

    const isAuthenticated = !!accessToken;

    const refreshAccessToken = async () => {
        try {
            if (refreshToken) {
                const newAccessToken = await getAccessToken(refreshToken);
                if (newAccessToken) {
                    setAccessToken(newAccessToken);
                    console.log("new access", newAccessToken);
                }
            }
        } catch (error) {
            handleResponseError(error);
        }
    };

    const authenticateUser = () => {
        setAccessToken(Cookies.get("accessToken") || null);
    };

    async function getAccessToken(refreshToken: string) {
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

    useEffect(() => {
        const tokenRefreshInterval = setInterval(() => {
            if (!accessToken) return;

            const isAccessTokenExpired = isTokenExpired(accessToken);

            if (isAccessTokenExpired) {
                refreshAccessToken();
            }
        }, 60000);

        return () => {
            clearInterval(tokenRefreshInterval);
        };
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                isAuthenticated,
                authenticateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
