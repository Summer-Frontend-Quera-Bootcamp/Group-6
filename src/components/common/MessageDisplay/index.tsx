import React from "react";

interface IMessageDisplayProps {
    messages: string[];
    type: "error" | "success";
}

const MessageDisplay: React.FC<IMessageDisplayProps> = ({ messages, type }) => {
    const bgColor = type === "error" ? "bg-red-primary" : "bg-teal-primary";
    const listStyle = type === "error" ? "list-disc" : "text-center";
    return (
        <div
            className={`w-full rounded-md p-xs ${bgColor} animate-fadeIn`}
            role="alert"
        >
            <ul
                className={`${listStyle} list-inside space-y-2 text-white`}
                dir="rtl"
            >
                {messages.map((message) => {
                    if (message !== "")
                        return (
                            <li key={message} className="space-x-2">
                                {message}
                            </li>
                        );
                })}
            </ul>
        </div>
    );
};

export default MessageDisplay;
