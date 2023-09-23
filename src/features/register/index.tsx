import { useRef, useState } from "react";
import "../../assets/global.css";
import FormContainer from "../../components/common/FormContainer";
import Input from "../../components/common/Input";
import MessageDisplay from "../../components/common/MessageDisplay";
import SubmitBtn from "../../components/common/SubmitBtn";
import useFormValidation from "../../hooks/useValidation";
import {
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidTerm,
} from "../../utils/formValidator";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const nameElement = useRef<HTMLInputElement>(null);
    const mailElement = useRef<HTMLInputElement>(null);
    const passElement = useRef<HTMLInputElement>(null);
    const { formStatus, handleFieldValidation, setMessage } =
        useFormValidation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameValue = nameElement.current?.value || "";
        const emailValue = mailElement.current?.value || "";
        const passValue = passElement.current?.value || "";

        await handleFieldValidation(emailValue, isValidEmail, "emailError");
        await handleFieldValidation(passValue, isValidPassword, "passError");
        await handleFieldValidation(nameValue, isValidName, "nameError");
        await handleFieldValidation(
            String(acceptedTerms),
            isValidTerm,
            "termError"
        );

        if (
            formStatus.emailError?.isValid &&
            formStatus.passError?.isValid &&
            formStatus.nameError?.isValid &&
            formStatus.termError?.isValid &&
            emailValue !== "" &&
            passValue !== "" &&
            nameValue !== ""
        ) {
            console.log("Form is valid, proceeding with submission.");
            setMessage(
                "ثبت نام با موفقیت انجام شد. درحال انتقال به صفحه ورود..."
            );
            setFormSubmitted(true);

            // TODO: User Login Logic
            setTimeout(() => navigate("/login"), 1000);
        } else {
            console.log("Form is not valid, cannot proceed.");
            setFormSubmitted(true);
        }
    };

    return (
        <FormContainer title="ثبت‌نام در کوئرا تسک منیجر">
            {formStatus.message ? (
                <MessageDisplay
                    messages={[formStatus.message]}
                    type="success"
                />
            ) : null}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-m self-stretch"
            >
                <Input
                    type="text"
                    id="name"
                    ref={nameElement}
                    onChange={(e) =>
                        handleFieldValidation(
                            e.target.value,
                            isValidName,
                            "nameError"
                        )
                    }
                    labelText="نام کامل"
                />
                <Input
                    type="email"
                    id="email"
                    ref={mailElement}
                    onChange={(e) =>
                        handleFieldValidation(
                            e.target.value,
                            isValidEmail,
                            "emailError"
                        )
                    }
                    labelText="ایمیل"
                />
                <Input
                    type="password"
                    id="password"
                    ref={passElement}
                    onChange={(e) =>
                        handleFieldValidation(
                            e.target.value,
                            isValidPassword,
                            "passError"
                        )
                    }
                    labelText="رمز عبور"
                />
                <div className="flex gap-2 ml-auto">
                    <label htmlFor="acceptedTerms">
                        .قوانین و مقررات را می‌پذیرم
                    </label>
                    <input
                        type="checkbox"
                        id="acceptedTerms"
                        className="w-[18px] h-[18px]"
                        checked={acceptedTerms}
                        onChange={async (e) => {
                            setAcceptedTerms(e.target.checked);
                            await handleFieldValidation(
                                String(e.target.checked),
                                isValidTerm,
                                "termError"
                            );
                        }}
                    />
                </div>
                {!formStatus.emailError?.isValid ||
                !formStatus.passError?.isValid ||
                !formStatus.nameError?.isValid ||
                (!formStatus.termError?.isValid && formSubmitted) ? (
                    <MessageDisplay
                        messages={[
                            formStatus.nameError?.message || "",
                            formStatus.emailError?.message || "",
                            formStatus.passError?.message || "",
                            formStatus.termError?.message || "",
                        ]}
                        type="error"
                    />
                ) : null}
                <SubmitBtn value="ثبت نام" ariaLabel="ثبت نام"></SubmitBtn>
            </form>
        </FormContainer>
    );
};

export default Register;
