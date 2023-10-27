import { ThemeActionTypes } from "./theme.actiontype";
import { AXIOS } from "@/config/axios";

export const UpdateTheme = (payload: PaletteColorType) => (dispatch: any) => {
    dispatch({
        type: ThemeActionTypes.CHANGE_PALLETE,
        payload: payload,
    });

    localStorage.setItem("PALETTE", payload);
};

export const LoadTheme = () => async (dispatch: any) => {
    try {
        const theme = localStorage.getItem("PALETTE");

        if (theme) {
            dispatch({
                type: ThemeActionTypes.CHANGE_PALLETE,
                payload: theme,
            });
        } else {
            const theme = await AXIOS.get("/settings/").then((res) => res.data);
            if (theme[0]?.theme) {
                dispatch({
                    type: ThemeActionTypes.CHANGE_PALLETE,
                    payload: theme[0]?.theme,
                });
                localStorage.setItem("PALETTE", theme[0]?.theme);
            } else {
                localStorage.setItem("PALETTE", theme[0]?.theme);
            }
        }
    } catch (error) {
        console.error(error);
    }
};
