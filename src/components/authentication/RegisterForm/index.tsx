import { MessageDisplay, SubmitBtn } from "@/components/common";
import { InputField } from "@/components/register/InputField";
import TermCheckbox from "@/components/register/TermCheckbox";
import { useMessages } from "@/context/MessagesContext";
import { UseRegisterMutation } from "@/services/Authentication/mutations/useRegisterMutation";
import { isRegisterValid } from "@/utils/formValidator";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
    const { messages, updateMessage } = useMessages();

    const usernameElement = useRef<HTMLInputElement>(null),
        mailElement = useRef<HTMLInputElement>(null),
        passElement = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const registerMutation = UseRegisterMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = usernameElement.current?.value || "";
        const mail = mailElement.current?.value || "";
        const pass = passElement.current?.value || "";
        const creds = {
            username: username,
            email: mail,
            password: pass,
            term: acceptedTerms,
        };

        const validationResult = await isRegisterValid(creds);

        if (validationResult && validationResult.isValid) {
            toast.loading("در حال بررسی اطلاعات...");
            registerMutation.mutate(creds, {
                onSuccess: () => {
                    navigate("/login");
                    toast.dismiss();
                    toast.success("اکانت شما با موفقیت ساخته شد.");
                },
                onError: (error) => {
                    console.error(error);

                    toast.dismiss();
                    toast.error(error);
                },
            });
        } else {
            if (validationResult.error?.errors)
                updateMessage("error", validationResult.error?.errors, 2000);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-m self-stretch"
        >
            <InputField
                ref={usernameElement}
                labelText="نام کاربری"
                type="text"
            />
            <InputField ref={mailElement} labelText="ایمیل" type="email" />
            <InputField
                ref={passElement}
                labelText="رمز عبور"
                type="password"
            />
            <TermCheckbox
                acceptedTerms={acceptedTerms}
                setAcceptedTerms={setAcceptedTerms}
            />
            {messages && (
                <MessageDisplay messages={messages.msg} type={messages.type} />
            )}
            <SubmitBtn
                value="ثبت نام"
                ariaLabel="ثبت نام"
                className="self-stretch"
                enablePalette={false}
            />
        </form>
    );
};

export default RegisterForm;
