type apiUrlType = {
    [t in string]: string;
};

export const APIURL: apiUrlType = {
    Login: "/accounts/login/",
    Register: "/accounts/",
    Update: "/accounts/",
    ChangePassword: "/accounts/change-password/",
    ChangeSetting: "/settings/",
    ForgotPassword:"/accounts/reset-password/",
    ResetPassword:"/accounts/reset-password/set-password/"
};
