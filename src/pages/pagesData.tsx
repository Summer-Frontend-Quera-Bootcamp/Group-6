import {
    Forgot,
    Login,
    ProfileAccount,
    ProfileDetails,
    ProfileSettings,
    Register,
    ResetPassword,
} from "@features/index";
import AuthLayout from "@layouts/authentication";
import ProfileLayout from "@layouts/profile";
import { Navigate } from "react-router-dom";
import { routerType } from "../types/router.types";

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
        element: <ProfileLayout children={<ProfileDetails />} />,
    },
    {
        path: "/profile/account",
        title: "account",
        element: <ProfileLayout children={<ProfileAccount />} />,
    },
];

const pagesData = [AuthPagesData, ProfilePagesData];

export default pagesData;
