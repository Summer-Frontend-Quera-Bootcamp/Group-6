import { ReactElement, useRef } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../../components/common/FormContainer";
import Input from "../../components/common/Input";
import MessageDisplay from "../../components/common/MessageDisplay";
import SubmitBtn from "../../components/common/SubmitBtn";
import useFormValidation from "../../hooks/useValidation";
import { isValidEmail, isValidPassword } from "../../utils/formValidator";

const Login: React.FC = (): ReactElement => {
    const mailElement = useRef<HTMLInputElement>(null);
    const passElement = useRef<HTMLInputElement>(null);

    const { formStatus, handleFieldValidation, setMessage } =
        useFormValidation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = mailElement.current?.value || "";
        const passValue = passElement.current?.value || "";

        await handleFieldValidation(emailValue, isValidEmail, "emailError");
        await handleFieldValidation(passValue, isValidPassword, "passError");

        if (
            formStatus.emailError?.isValid &&
            formStatus.passError?.isValid &&
            emailValue !== "" &&
            passValue !== ""
        ) {
            console.log("Form is valid, proceeding with submission.");
            setMessage("با موفقیت وارد شدید.");
            // TODO: User Login Logic
        } else {
            console.log("Form is not valid, cannot proceed.");
        }
    };

    return (
        <FormContainer title="(: به کوئرا تسک منیجر خوش برگشتی">
            {formStatus.message ? (
                <MessageDisplay
                    messages={[formStatus.message]}
                    type="success"
                />
            ) : null}

            <form
                className="flex flex-col items-center gap-l self-stretch"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-end gap-m self-stretch text-body-s font-[400]">
                    <Input
                        ref={mailElement}
                        id="email"
                        type="email"
                        onChange={(e) =>
                            handleFieldValidation(
                                e.target.value,
                                isValidEmail,
                                "emailError"
                            )
                        }
                        labelText="ایمیل"
                    />
                    <div className="flex flex-col self-stretch items-end gap-xs">
                        <Input
                            ref={passElement}
                            id="password"
                            type="password"
                            onChange={(e) =>
                                handleFieldValidation(
                                    e.target.value,
                                    isValidPassword,
                                    "passError"
                                )
                            }
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
                {!formStatus.emailError?.isValid ||
                !formStatus.passError?.isValid ? (
                    <MessageDisplay
                        messages={[
                            formStatus.emailError?.message || "",
                            formStatus.passError?.message || "",
                        ]}
                        type="error"
                    />
                ) : null}

                <SubmitBtn value="ورود" ariaLabel="ورود" />

                <p className="text-body-m">
                    <span className="font-[500]">ثبت‌نام نکرده‌ای؟ </span>
                    <Link
                        className="text-brand-primary font-[800] hover:cursor-pointer"
                        to="/register"
                    >
                        ثبت‌نام
                    </Link>
                </p>
            </form>
        </FormContainer>
    );
};

export default Login;
