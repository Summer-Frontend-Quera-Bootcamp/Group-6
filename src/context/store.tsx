import { createContext, useEffect, useReducer } from "react";
import {
    IAppContext,
    IAppContextState,
    IContextAction,
} from "./types/context.type";
import { UserReducer } from "./user/user.reducer";
import {
    LogoutUser,
    ReJoinUser,
    UpdateWorkspaces,
    isRefreshTokenExpired,
} from "./user/user.action";
import { ThemeReducer } from "./theme/theme.reducer";
import { LoadTheme } from "./theme/theme.action";
import { TasksReducer } from "./tasks/tasks.reducer";

export const initialState: IAppContextState = {
    user: {
        username: "",
        email: "",
        access: "",
        first_name: "",
        last_name: "",
        refresh: "",
        thumbnail: "",
        user_id: 0,
        phone_number: "",
        workspaces: [],
    },
    theme: "#208d8e" as PaletteColorType,
    tasks: [],
};

const combineReducer = (
    { user, theme, tasks }: IAppContextState,
    action: IContextAction<any, any>
) => ({
    user: UserReducer(user, action),
    theme: ThemeReducer(theme, action),
    tasks: TasksReducer(tasks, action),
});

export const AppContext = createContext<IAppContext>({
    state: initialState,
    dispatch: () => null,
});

const thunkMiddleware = (dispatch: any) => (action: any) => {
    if (typeof action === "function") {
        return action(dispatch);
    }
    return dispatch(action);
};

interface IAppContextProviderProps extends React.PropsWithChildren {}
export const AppContextProvider: React.FC<IAppContextProviderProps> = ({
    children,
}): JSX.Element => {
    const [state, dispatch] = useReducer(combineReducer, initialState);
    const dispatchWithMiddleware = thunkMiddleware(dispatch);

    useEffect(() => {
        if (!isRefreshTokenExpired()) {
            dispatchWithMiddleware(ReJoinUser());
            dispatchWithMiddleware(LoadTheme());
            dispatchWithMiddleware(UpdateWorkspaces());
        } else {
            dispatchWithMiddleware(LogoutUser());
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch: dispatchWithMiddleware,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
