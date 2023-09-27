import { Route, Routes } from "react-router-dom";
import pagesData from "@pages/pagesData";

const AppRoutes = () => {
    const pageRoutes = pagesData.map((page) =>
        page.map(({ path, title, element }) => {
            return <Route key={title} path={`/${path}`} element={element} />;
        })
    );

    return <Routes>{pageRoutes}</Routes>;
};

export default AppRoutes;
