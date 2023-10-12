import { getAccount } from "@/services/Accounts";
import UserData from "@/types/userData.types";
import Cookies from "js-cookie";
import React, { createContext, useState, useContext } from "react";

interface IUserContextProps {
    children: React.ReactNode;
}

interface IUserContext {
    saveUserData: (data: UserData) => void;
    clearUserData: () => void;
    userData: UserData | null;
    updateUser: any;
}

const UserContext = createContext<IUserContext | null>(null);

export const useUserData = () => {
    const context = useContext(UserContext);
    return context;
};

export const UserProvider = ({ children }: IUserContextProps) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const updateUser = async () => {
        console.log("calling api");

        // const userId = Cookies.get("userId");
        // if (userId) {
        //     try {
        //         const userData: UserData = await getAccount(userId);
        //         console.log(userData);

        //         setUserData(userData);
        //         return userData;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    };

    const saveUserData = (data: UserData) => {
        setUserData((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    const clearUserData = () => {
        setUserData(null);
    };

    return (
        <UserContext.Provider
            value={{ userData, saveUserData, clearUserData, updateUser }}
        >
            {children}
        </UserContext.Provider>
    );
};
