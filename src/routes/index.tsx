import { AppContext } from "@/context/store";
import { IsUserAuthenticated } from "@/context/user/user.action";
import pagesData from "@/routes/pagesData";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ForbidAuth, RequireAuth } from "./AuthRedirects";

const AppRoutes = () => {
    const { dispatch } = useContext(AppContext);
    const isAuthenticated = dispatch(IsUserAuthenticated());

    const pageRoutes = pagesData.map((page) =>
        page.map(({ path, title, element, isProtected, isAuth }) => {
            if (isProtected && !isAuthenticated) {
                element = <RequireAuth />;
            }
            if (isAuth && isAuthenticated) {
                element = <ForbidAuth />;
            }
            return <Route key={title} path={`/${path}`} element={element} />;
        })
    );

    return <Routes>{pageRoutes}</Routes>;
};

export default AppRoutes;
