import { Forgot, Login, Register, ResetPassword } from "../features";
import AuthLayout from "../layouts/authentication";
import ProfileLayout from "../layouts/profile";
import { routerType } from "../types/router.types";

const AuthPagesData: routerType[] = [
    {
        path: "/",
        title: "login",
        element: <AuthLayout children={<Login />} />,
    },
    {
        path: "/login",
        title: "login",
        element: <AuthLayout children={<Login />} />,
    },
    {
        path: "/register",
        title: "register",
        element: <AuthLayout children={<Register />} />,
    },
    {
        path: "/forgot",
        title: "forgot",
        element: <AuthLayout children={<Forgot />} />,
    },
    {
        path: "/reset-password",
        title: "reset-password",
        element: <AuthLayout children={<ResetPassword />} />,
    },
];

const ProfilePagesData: routerType[] = [
    {
        path: "/profile",
        title: "profile",
        element: <ProfileLayout children={<h1>profile</h1>} />,
    },
    {
        path: "/profile/details",
        title: "details",
        element: <ProfileLayout children={<h1>details</h1>} />,
    },
    {
        path: "/profile/account",
        title: "account",
        element: <ProfileLayout children={<h1>account</h1>} />,
    },
];

const pagesData = [AuthPagesData, ProfilePagesData];

export default pagesData;
