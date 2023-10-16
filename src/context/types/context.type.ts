export interface IAppContextState {
    user: IUserState;
    theme: PaletteColorType;
}

export interface IContextAction<T, K> {
    type: T;
    payload?: K;
}

export interface IAppContext {
    state: IAppContextState;
    dispatch: any;
}

export interface IUserState {
    refresh: string;
    access: string;
    user_id: number;
    id?: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: any;
    thumbnail: string;
}
export interface IThemeState {
    theme: PaletteColorType;
}
