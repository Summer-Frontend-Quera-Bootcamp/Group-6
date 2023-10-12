import { Route, Routes } from "react-router-dom";
import pagesData from "@/routes/pagesData";
import { useAuth } from "@/context/AuthContext";
import RequireAuth from "./RequireAuth";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    const pageRoutes = pagesData.map((page) =>
        page.map(({ path, title, element, isProtected }) => {
            if (isProtected && !isAuthenticated) {
                element = <RequireAuth />;
            }

            return <Route key={title} path={`/${path}`} element={element} />;
        })
    );

    return <Routes>{pageRoutes}</Routes>;
};

export default AppRoutes;
