export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ILoginResponse {
    refresh: string;
    access: string;
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: any;
    thumbnail: string;
}

export interface IRegisterRequest {
    username: string;
    password: string;
}

export interface IRegisterResponse {
    id: number;
    username: string;
    email: string;
}

export type IUpdateRequest = FormData | IUpdatedInfo;

interface IUpdatedInfo {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    thumbnail?: string;
}
export interface IUpdateResponse {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    thumbnail: string;
}
export interface IBoardArchieRes {}

export interface IBoardArchie {
    space_id?: string;
    project_id?: string;
    id?: number;
    name?: string;
    is_archive?: boolean;
    board?: IBoardData;
}
export interface ITokenData {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
}

export interface IUpdatePassword {
    old_password: string;
    new_password: string;
    new_password1: string;
}

export interface IThemeData {
    theme: PaletteColorType;
}

export interface IForgotPassword {
    email: string;
}
export interface IResetPassword {
    token?: string;
    password?: string;
    password1?: string;
}
export interface IProjectData {
    space_id?: number;
    name: string;
    id?: number;
}
export interface IBoardData {
    id?: number;
    space_id?: string | number;
    project_id?: string | number;
    board_id?: string | number;
    name?: string;
    is_archive?: boolean;
    color?: string;
}
export interface IProjectDataResponse {
    name: string;
    id: number;
}
export interface IBoardDataItem {
    name: string;
    order: number;
    is_archive: boolean;
    color: string;
}
export interface IDefaultBoardData {
    space_id: number | string;
    project_id: number;
}
export interface IProjectRemoveData {
    space_id?: number;
    project_id?: number;
}
export interface IWorkspaceRemoveData {
    space_id?: number;
}

export interface IWorkspaceData {
    name: string;
    color: string;
}
export interface ITasksRequest {
    name?: string;
    description?: string;
    attachment?: string | Object | File;
    thumbnail?: string | Object | File;
    priority?: number;
    order?: number;
    deadline?: string;
    project?: {
        idx: number;
        id: number;
        name: string;
    };
    board?: number;
    task_id?: number;
    space_id?: number | string;
    project_id?: number | string;
    board_id?: number | string;
    params?: {
        space_id: number;
        project_id: number;
        baord_id?: number;
    };
}

export interface ITasksResponse {
    id: number;
    name: string;
    description: string;
    deadline: string;
    priority: number;
    attachment: string;
    thumbnail: string;
    order: number;
    members: string;
    created_at: string;
}
