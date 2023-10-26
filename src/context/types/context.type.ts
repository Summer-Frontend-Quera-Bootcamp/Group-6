export interface IAppContextState {
    user: IUserState;
    theme: PaletteColorType;
    tasks: ITaskData[];
}

export interface IContextAction<T, K> {
    type: T;
    payload?: K;
}

export interface IAppContext {
    state: IAppContextState;
    dispatch: any;
}

export interface IProjects {
    id: number;
    name: string;
    boards?: IBoardData[];
}
export interface IWorkspaces {
    id: number;
    name: string;
    color: string;
    projects?: IProjects[];
}
export interface WorkspacesData {
    workspaces: IWorkspaces[];
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
    workspaces: IWorkspaces[];
}
export interface IThemeState {
    theme: PaletteColorType;
}

export interface ITaskData {
    id: number;
    name: string;
    description: string;
    deadline: string;
    priority: number;
    attachment: string;
    thumbnail: string;
    order: number;
    members: string[] | string;
}

export interface IBoardData {
    id: number;
    name: string;
    order: number;
    tasks: ITaskData[];
    tasks_count: string;
    is_archive: boolean;
    color: string;
}
