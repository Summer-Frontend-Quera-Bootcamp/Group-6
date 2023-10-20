import { ITokenData, IUpdateResponse } from "@/types/api.types";
import { AXIOS } from "../../config/axios";
import { initialState } from "../store";
import { IUserState, WorkspacesData } from "../types/context.type";
import { UserActionTypes } from "./user.actiontype";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const LogoutUser = () => (dispatch: any) => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    AXIOS.defaults.headers.common.Authorization = "";
    dispatch({
        type: UserActionTypes.USER_LOGGED_OUT,
    });
};

export const AuthenticateUser = (payload: IUserState) => (dispatch: any) => {
    Cookies.set("accessToken", payload.access);
    Cookies.set("refreshToken", payload.refresh);
    Cookies.set(
        "user",
        JSON.stringify({
            email: payload.email,
            first_name: payload.first_name,
            last_name: payload.last_name,
            phone_number: payload.phone_number,
            thumbnail: `${payload.thumbnail}`,
            id: payload.user_id,
            username: payload.username,
        })
    );
    dispatch({
        type: UserActionTypes.USER_LOGGED_IN,
        payload,
    });
    AXIOS.defaults.headers.common.Authorization = `Bearer ${payload.access}`;
};

export const UpdateUser = (payload: IUpdateResponse) => (dispatch: any) => {
    dispatch({
        type: UserActionTypes.UPDATED_USER,
        payload,
    });

    const userItem = Cookies.get("user");
    if (userItem) {
        const user = JSON.parse(userItem);
        Cookies.set("user", JSON.stringify({ ...user, ...payload }));
    }
};

export const UpdateWorkspaces =
    (payload: WorkspacesData) => (dispatch: any) => {
        dispatch({
            type: UserActionTypes.GET_WORKSPACES,
            payload,
        });

        const userItem = Cookies.get("user");
        if (userItem) {
            const user = JSON.parse(userItem);
            Cookies.set("user", JSON.stringify({ ...user, ...payload }));
        }
    };

export const ReJoinUser = () => (dispatch: any) => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const user = Cookies.get("user");

    if (accessToken && refreshToken && user) {
        const userPayload = JSON.parse(user);
        dispatch({
            type: UserActionTypes.USER_LOGGED_IN,
            payload: {
                access: accessToken,
                refresh: refreshToken,
                ...userPayload,
            },
        });

        AXIOS.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        LogoutUser();
    }
};

export const IsUserAuthenticated = () => () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const user = Cookies.get("user");

    if (
        accessToken &&
        refreshToken &&
        user &&
        JSON.parse(user) !== initialState
    ) {
        return true;
    } else {
        LogoutUser();
        return false;
    }
};

export const isRefreshTokenExpired = () => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
        return true;
    }
    try {
        const refreshTokenData: ITokenData = jwt_decode(refreshToken);

        if (
            refreshTokenData &&
            refreshTokenData.exp &&
            refreshTokenData.exp < Date.now() / 1000
        ) {
            return true;
        }
    } catch (error) {
        console.error(error);
        LogoutUser();
    }
    return false;
};
