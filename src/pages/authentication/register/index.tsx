import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, MessageDisplay, SubmitBtn } from "@components/common";
import TermCheckbox from "@components/register/TermCheckbox";
import { InputField } from "@components/register/InputField";
import { isRegisterValid } from "@utils/formValidator";
import { useMessages } from "@context/MessagesContext";

const Register: React.FC = () => {
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
    const { messages, updateMessage } = useMessages();

    const nameElement = useRef<HTMLInputElement>(null),
        mailElement = useRef<HTMLInputElement>(null),
        passElement = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const FullName = nameElement.current?.value || "";
        const mail = mailElement.current?.value || "";
        const pass = passElement.current?.value || "";
        const creds = {
            name: FullName,
            email: mail,
            password: pass,
            term: acceptedTerms,
        };

        updateMessage("info", "درحال بررسی اطلاعات...");
        const validationResult = await isRegisterValid(creds);

        if (validationResult.isValid) {
            updateMessage(
                "success",
                "ثبت نام با موفقیت انجام شد. درحال انتقال به صفحه ورود...",
                1000
            );
            setTimeout(() => navigate("/login"), 1000);
        } else {
            updateMessage("error", validationResult.error!.errors, 2000);
        }
    };

    return (
        <FormContainer title="ثبت‌نام در کوئرا تسک منیجر">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-m self-stretch"
            >
                <InputField
                    ref={nameElement}
                    labelText="نام کامل"
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
                    <MessageDisplay
                        messages={messages.msg}
                        type={messages.type}
                    />
                )}
                <SubmitBtn
                    value="ثبت نام"
                    ariaLabel="ثبت نام"
                    className="self-stretch"
                    enablePalette={false}
                />
            </form>
        </FormContainer>
    );
};
export default Register;
