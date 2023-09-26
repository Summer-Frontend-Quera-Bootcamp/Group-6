import { ReactElement, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    FormContainer,
    Input,
    MessageDisplay,
    SubmitBtn,
} from "../../../components/common";
import useFormValidation from "../../../hooks/useValidation";
import { isValidPassword } from "../../../utils/formValidator";

const ResetPassword: React.FC = (): ReactElement => {
    const passElement = useRef<HTMLInputElement>(null);
    const { formStatus, handleFieldValidation, setMessage } =
        useFormValidation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passValue = passElement.current?.value || "";

        await handleFieldValidation(passValue, isValidPassword, "passError");

        if (formStatus.passError?.isValid && passValue !== "") {
            console.log("Form is valid, proceeding with submission.");
            setMessage(
                "رمز عبور با موفقيت تغيير يافت. در حال انتقال به صفحه ورود..."
            );
            //TODO handle reset password logic
            setTimeout(() => navigate("/login"), 1000);
        } else {
            console.log("Form is not valid, cannot proceed.");
        }
    };

    return (
        <FormContainer title=" بازيابی رمز  عبور">
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
                            labelText="رمز عبور جدید را وارد کنید"
                        />
                    </div>
                </div>
                {!formStatus.passError?.isValid ? (
                    <MessageDisplay
                        messages={[formStatus.passError?.message || ""]}
                        type="error"
                    />
                ) : null}

                <SubmitBtn
                    value="تغيير رمز عبور"
                    ariaLabel="تغيير رمز عبور"
                    className="self-stretch"
                    enablePalette={false}
                />
            </form>
        </FormContainer>
    );
};

export default ResetPassword;
