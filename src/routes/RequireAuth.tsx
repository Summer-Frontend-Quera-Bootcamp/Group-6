import { useMessages } from "@/context/MessagesContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth: React.FC = () => {
    const { updateMessage } = useMessages();
    useEffect(() => {
        updateMessage("info", "لطفا دوباره وارد شوید.", 5000);
    }, [updateMessage]);
    return <Navigate to="/login" />;
};

export default RequireAuth;
