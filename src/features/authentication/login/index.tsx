import { ReactElement, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FormContainer,
    Input,
    MessageDisplay,
    SubmitBtn,
} from "../../../components/common";
import useFormValidation from "../../../hooks/useValidation";
import { isValidLogin } from "../../../utils/formValidator";

const Login: React.FC = (): ReactElement => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const mailElement = useRef<HTMLInputElement>(null);
    const passElement = useRef<HTMLInputElement>(null);
    const { formStatus, handleFieldValidation, setMessage } =
        useFormValidation();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = mailElement.current?.value || "";
        const passValue = passElement.current?.value || "";
        const creds = { email: emailValue, password: passValue };

        const validationResult = await handleFieldValidation(
            creds,
            isValidLogin,
            "loginError"
        );

        // TODO: change the functionality of the login
        if (validationResult && validationResult.isValid) {
            console.log("Form is valid, proceeding with submission.");
            setMessage("با موفقیت وارد شدید. در حال انتقال به داشبورد...");
            setFormSubmitted(true);
            setTimeout(() => navigate("/dashboard"), 1000); //TODO: change to the correct dashboard url
        } else {
            console.log("Form is not valid, cannot proceed.");
            setFormSubmitted(true);
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
                        labelText="ایمیل"
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
                {!formStatus.loginError?.isValid && formSubmitted ? (
                    <MessageDisplay
                        messages={[formStatus.loginError?.message || ""]}
                        type="error"
                    />
                ) : null}

                <SubmitBtn
                    value="ورود"
                    ariaLabel="ورود"
                    className="self-stretch"
                    enablePalette={false}
                />

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
