import DashBoardLayout from "@/layouts/dashboard";
import FullCalendar from "@/pages/dashboard/calView/Calendar";
import ColView from "@/pages/dashboard/colView";
import List from "@/pages/dashboard/listView";
import { routerType } from "@/types/router.types";
import AuthLayout from "@layouts/authentication";
import ProfileLayout from "@layouts/profile";
import {
    Forgot,
    Login,
    ProfileAccount,
    ProfileDetails,
    ProfileSettings,
    Register,
    ResetPassword,
} from "@pages/index";
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
        element: <Navigate to="/profile/details" />,
        isProtected: true,
    },
    {
        path: "/profile/settings",
        title: "settings",
        element: <ProfileLayout children={<ProfileSettings />} />,
        isProtected: true,
    },
    {
        path: "/profile/details",
        title: "details",
        element: <ProfileLayout children={<ProfileDetails />} />,
        isProtected: true,
    },
    {
        path: "/profile/account",
        title: "account",
        element: <ProfileLayout children={<ProfileAccount />} />,
        isProtected: true,
    },
];

const DashboardPagesData: routerType[] = [
    {
        path: "/dashboard",
        title: "dashboard",
        element: <DashBoardLayout children={<ColView />} />,
    },
    {
        path: "/dashboard/col",
        title: "dashboard column view",
        element: <DashBoardLayout children={<ColView />} />,
    },
    {
        path: "/dashboard/cal",
        title: "dashboard calender view",
        element: <DashBoardLayout children={<FullCalendar />} />,
    },
    {
        path: "/dashboard/list",
        title: "dashboard list view",
        element: <DashBoardLayout children={<List />} />,
    },
];

const pagesData = [AuthPagesData, ProfilePagesData, DashboardPagesData];

export default pagesData;
