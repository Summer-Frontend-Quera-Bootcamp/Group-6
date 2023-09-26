import { ReactElement, useRef, useState } from "react";
import {
    FormContainer,
    Input,
    MessageDisplay,
    SubmitBtn,
} from "../../../components/common";
import useFormValidation from "../../../hooks/useValidation";
import { isValidEmail } from "../../../utils/formValidator";

const Forgot: React.FC = (): ReactElement => {
    const mailElement = useRef<HTMLInputElement>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const { formStatus, handleFieldValidation } = useFormValidation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = mailElement.current?.value || "";

        await handleFieldValidation(emailValue, isValidEmail, "emailError");

        if (formStatus.emailError?.isValid && emailValue !== "") {
            console.log("Form is valid, proceeding with submission.");
            setIsFormValid(true);
            //TODO handle forgot logic
        } else {
            console.log("Form is not valid, cannot proceed.");
        }
    };

    return (
        <FormContainer title="فراموشی رمز عبور">
            {formStatus.message ? (
                <MessageDisplay
                    messages={[formStatus.message]}
                    type="success"
                />
            ) : null}
            {!isFormValid ? (
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
                            labelText="ايميل خود را وارد كنيد"
                        />
                    </div>
                    {!formStatus.emailError?.isValid ? (
                        <MessageDisplay
                            messages={[formStatus.emailError?.message || ""]}
                            type="error"
                        />
                    ) : null}

                    <SubmitBtn
                        value="دريافت ايميل بازيابی رمز عبور"
                        ariaLabel="بازيابی رمز عبور"
                        className="self-stretch"
                        enablePalette={false}
                    />
                </form>
            ) : (
                <p className="text-body-s">
                    .لینک بازیابی رمز عبور برای شما ایمیل شد. لطفا ایمیل خود را
                    بررسی کنید
                </p>
            )}
        </FormContainer>
    );
};

export default Forgot;
