import {
    Forgot,
    Login,
    Register,
    ResetPassword,
    ProfileSettings,
} from "../features";
import AuthLayout from "../layouts/authentication";
import ProfileLayout from "../layouts/profile";
import { routerType } from "../types/router.types";
import { Navigate } from "react-router-dom";

const AuthPagesData: routerType[] = [
    {
        path: "/",
        title: "login",
        element: <Navigate to="/login" />,
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
        element: <ProfileLayout children={<ProfileSettings />} />,
    },
    {
        path: "/profile/settings",
        title: "settings",
        element: <ProfileLayout children={<ProfileSettings />} />,
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
