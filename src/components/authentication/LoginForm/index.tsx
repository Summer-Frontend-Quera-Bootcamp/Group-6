import { Input, MessageDisplay, SubmitBtn } from "@/components/common";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessagesContext";
import { isLoginValid } from "@/utils/formValidator";
import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const { messages, updateMessage } = useMessages();
    const usernameElement = useRef<HTMLInputElement>(null);
    const passElement = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const { authenticateUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usernameValue = usernameElement.current?.value || "";
        const passValue = passElement.current?.value || "";

        const creds = {
            username: usernameValue,
            password: passValue,
        };

        updateMessage("info", "درحال بررسی اطلاعات...");
        const validationResult = await isLoginValid(creds);

        if (validationResult && validationResult.isValid) {
            authenticateUser();
            updateMessage(
                "success",
                "با موفقیت وارد شدید. در حال انتقال به داشبورد...",
                1000
            );
            setTimeout(() => navigate("/dashboard"), 1000);
        } else {
            updateMessage("error", validationResult.error!.errors, 2000);
        }
    };

    return (
        <form
            className="flex flex-col items-center gap-l self-stretch"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-end gap-m self-stretch text-body-s font-[400]">
                <Input
                    ref={usernameElement}
                    id="username"
                    type="text"
                    labelText="نام کاربری"
                />
                <div className="flex flex-col self-stretch items-end gap-xs">
                    <Input
                        ref={passElement}
                        id="password"
                        type="password"
                        labelText="رمز عبور"
                    />
                    <Link
                        className="text-brand-primary text-bold-xs font-[800]"
                        to="/forgot"
                    >
                        رمز عبور را فراموش کرده‌ای؟
                    </Link>
                </div>
            </div>
            {messages && (
                <MessageDisplay messages={messages.msg} type={messages.type} />
            )}
            <SubmitBtn
                value="ورود"
                ariaLabel="ورود"
                className="self-stretch"
                enablePalette={false}
            />
        </form>
    );
};

export default LoginForm;
