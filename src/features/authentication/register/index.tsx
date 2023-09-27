import { FormContainer, MessageDisplay, SubmitBtn } from "@components/common";
import useFormValidation from "@hooks/useValidation";
import {
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidTerm,
} from "@utils/formValidator";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "./components/InputField";
import TermCheckbox from "./components/TermCheckbox";

const Register: React.FC = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false),
        [formSubmitted, setFormSubmitted] = useState(false);

    const navigate = useNavigate();
    const { formStatus, handleFieldValidation, setMessage } =
        useFormValidation();
    const { emailError, passError, nameError, termError, message } = formStatus;

    const nameElement = useRef<HTMLInputElement>(null),
        mailElement = useRef<HTMLInputElement>(null),
        passElement = useRef<HTMLInputElement>(null);

    const isFormValid = () =>
        emailError?.isValid &&
        passError?.isValid &&
        nameError?.isValid &&
        termError?.isValid;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await Promise.all([
            handleFieldValidation(
                nameElement.current?.value || "",
                isValidName,
                "nameError"
            ),
            handleFieldValidation(
                mailElement.current?.value || "",
                isValidEmail,
                "emailError"
            ),
            handleFieldValidation(
                passElement.current?.value || "",
                isValidPassword,
                "passError"
            ),
            handleFieldValidation(
                String(acceptedTerms),
                isValidTerm,
                "termError"
            ),
        ]);

        if (isFormValid()) {
            // TODO: handle register logic
            setMessage(
                "ثبت نام با موفقیت انجام شد. درحال انتقال به صفحه ورود..."
            );
            setFormSubmitted(true);
            setTimeout(() => navigate("/login"), 1000);
        } else setFormSubmitted(true);
    };

    return (
        <FormContainer title="ثبت‌نام در کوئرا تسک منیجر">
            {message && <MessageDisplay messages={[message]} type="success" />}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-m self-stretch"
            >
                <InputField
                    ref={nameElement}
                    labelText="نام کامل"
                    type="text"
                    validator={isValidName}
                    handler={handleFieldValidation}
                    field="nameError"
                />
                <InputField
                    ref={mailElement}
                    labelText="ایمیل"
                    type="email"
                    validator={isValidEmail}
                    handler={handleFieldValidation}
                    field="emailError"
                />
                <InputField
                    ref={passElement}
                    labelText="رمز عبور"
                    type="password"
                    validator={isValidPassword}
                    handler={handleFieldValidation}
                    field="passError"
                />
                <TermCheckbox
                    acceptedTerms={acceptedTerms}
                    setAcceptedTerms={setAcceptedTerms}
                    handler={handleFieldValidation}
                />
                {!isFormValid() && formSubmitted && (
                    <MessageDisplay
                        messages={[
                            formStatus.nameError?.message || "",
                            formStatus.emailError?.message || "",
                            formStatus.passError?.message || "",
                            formStatus.termError?.message || "",
                        ]}
                        type="error"
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
