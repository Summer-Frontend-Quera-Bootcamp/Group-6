import { IContextAction, IUserState } from "../types/context.type";
import { UserActionTypes } from "./user.actiontype";

export const UserReducer = (
    state: IUserState,
    action: IContextAction<UserActionTypes, Partial<IUserState>>
): IUserState => {
    switch (action.type) {
        case UserActionTypes.USER_LOGGED_IN:
            let thumbnail = action?.payload?.thumbnail;
            if (!thumbnail?.includes("https://quera.iran.liara.run"))
                thumbnail = `https://quera.iran.liara.run${action?.payload?.thumbnail}`;
            return {
                access: action?.payload?.access || "",
                refresh: action?.payload?.refresh || "",
                email: action?.payload?.email || "",
                first_name: action?.payload?.first_name || "",
                last_name: action?.payload?.last_name || "",
                thumbnail: thumbnail || "",
                user_id: action?.payload?.user_id || action?.payload?.id || 0,
                username: action?.payload?.username || "",
                phone_number: action?.payload?.phone_number || "",
            };
        case UserActionTypes.UPDATED_USER:
            return {
                access: action?.payload?.access || state.access || "",
                refresh: action?.payload?.refresh || state.refresh || "",
                email: action?.payload?.email || state.email || "",
                first_name:
                    action?.payload?.first_name || state.first_name || "",
                last_name: action?.payload?.last_name || state.last_name || "",
                thumbnail: action?.payload?.thumbnail || "",
                user_id: state.user_id,
                username: action?.payload?.username || state.username || "",
                phone_number:
                    action?.payload?.phone_number || state.phone_number || "",
            };
        case UserActionTypes.USER_LOGGED_OUT:
            return {
                access: "",
                refresh: "",
                email: "",
                first_name: "",
                last_name: "",
                thumbnail: "",
                user_id: 0,
                username: "",
                phone_number: "",
            };
        default:
            return state;
    }
};
