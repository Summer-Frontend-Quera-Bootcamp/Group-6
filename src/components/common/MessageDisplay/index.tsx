import React from "react";

interface IMessageDisplayProps {
    messages: string[] | string;
    type: "error" | "success" | "info";
    classNames?: string;
}

function getBgColor(type: string): string {
    switch (type) {
        case "error":
            return "bg-red-primary";
        case "info":
            return "bg-yellow-darkmode";
        default:
            return "bg-teal-primary";
    }
}

const MessageDisplay: React.FC<IMessageDisplayProps> = ({
    messages,
    type,
    classNames,
}) => {
    const bgColor = getBgColor(type);
    const listStyle = type === "error" ? "list-disc" : "text-center";

    // Normalize messages to an array
    const messagesObject = Array.isArray(messages) ? messages : [messages];

    return (
        <div
            className={`w-full rounded-md p-xs animate-fadeIn ${bgColor}`}
            role="alert"
        >
            <ul
                className={`${listStyle} list-inside space-y-2 text-white ${classNames}`}
                dir="rtl"
            >
                {messagesObject.map((message, index) => {
                    if (message !== "") {
                        return (
                            <li
                                key={`${message}-${index}`}
                                className="space-x-2"
                            >
                                {message}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </div>
    );
};

export default MessageDisplay;
