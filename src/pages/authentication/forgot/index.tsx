import { ReactElement, useRef, useState } from "react";

import {
    FormContainer,
    Input,
    MessageDisplay,
    SubmitBtn,
} from "@components/common";
import { isEmailValid } from "@utils/formValidator";

const Forgot: React.FC = (): ReactElement => {
    const mailElement = useRef<HTMLInputElement>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [message, setMessage] = useState<{
        msg: string[] | string;
        type: "info" | "success" | "error";
    }>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = mailElement.current?.value || "";
        const validationResult = await isEmailValid(emailValue);

        if (validationResult.isValid) {
            //TODO handle forgot logic
            setMessage({
                msg: "ثبت نام با موفقیت انجام شد. درحال انتقال به صفحه ورود...",
                type: "success",
            });
            setIsFormValid(true);
        } else {
            const errorMsg = validationResult.error
                ? validationResult.error?.errors
                : "هنگام ثبت نام مشکلی پیش آمده";
            setMessage({
                msg: errorMsg,
                type: "error",
            });
        }
    };

    return (
        <FormContainer title="فراموشی رمز عبور">
            {message && (
                <MessageDisplay messages={message.msg} type={message.type} />
            )}
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
                            labelText="ايميل خود را وارد كنيد"
                        />
                    </div>
                    {message && (
                        <MessageDisplay
                            messages={message.msg}
                            type={message.type}
                        />
                    )}
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
