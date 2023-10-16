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
