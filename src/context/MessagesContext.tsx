import React, { createContext, useState, useContext } from "react";

interface IMessage {
    msg: string[] | string;
    type: "info" | "success" | "error";
}

interface IMessagesContextProps {
    children: React.ReactNode;
}

interface IFormMessageContext {
    messages: IMessage | null;
    updateMessage: (
        type: "info" | "error" | "success",
        msg: string | string[],
        time?: number
    ) => void;
}

const MessagesContext = createContext({} as IFormMessageContext);

export const useMessages = () => {
    return useContext(MessagesContext);
};

export const MessagesProvider = ({ children }: IMessagesContextProps) => {
    const [messages, setMessages] = useState<IMessage | null>(null);

    const updateMessage = (
        type: "info" | "error" | "success",
        msg: string | string[],
        time?: number
    ) => {
        //* آپدیت کردن پیغام به کاربر با متن و تایپ جدید
        setMessages({ type: type, msg: msg });
        //* در صورت دریافت زمان، جعبه پیغام بعد از زمان داده شده بسته خواهد شد
        if (time) clearMessage(time);
    };

    const clearMessage = (time = 2000) => {
        //* بعد از زمان داده شده، پیغام ها پاک می شوند
        setTimeout(() => {
            setMessages(null);
        }, time);
    };

    return (
        <MessagesContext.Provider value={{ messages, updateMessage }}>
            {children}
        </MessagesContext.Provider>
    );
};
