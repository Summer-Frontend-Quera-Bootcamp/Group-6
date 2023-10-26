import { IContextAction } from "../types/context.type";
import { ThemeActionTypes } from "./theme.actiontype";

export const ThemeReducer = (
    state: PaletteColorType,
    action: IContextAction<ThemeActionTypes, Partial<PaletteColorType>>
): PaletteColorType => {
    const theme = localStorage.getItem("PALETTE") as PaletteColorType;

    switch (action.type) {
        case ThemeActionTypes.CHANGE_PALLETE:
            return action.payload || theme;
        default:
            return theme || state;
    }
};
