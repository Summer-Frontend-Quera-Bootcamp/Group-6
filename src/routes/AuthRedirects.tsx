import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequireAuth: React.FC = () => {
    useEffect(() => {
        toast.info("لطفا وارد شوید.");
    }, []);
    const { pathname } = location;
    return <Navigate to="/login" state={{ from: pathname }} />;
};

const ForbidAuth: React.FC = () => {
    useEffect(() => {
        toast.info("شما از قبل وارد شده اید.");
    }, []);
    return <Navigate to="/" />;
};

export { RequireAuth, ForbidAuth };
