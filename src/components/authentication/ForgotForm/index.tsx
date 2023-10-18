import { Input, SubmitBtn } from "@/components/common";
import { UseForgotMutation } from "@/services/Authentication/mutations/useForgotMutation";
import { isEmailValid } from "@/utils/formValidator";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const ForgotForm = () => {
    const emailElement = useRef<HTMLInputElement>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    
    const forgotMutation = UseForgotMutation();    
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = emailElement.current?.value || "";
        
        const creds = {
            email: emailValue,
        };

        const validationResult = await isEmailValid(emailValue);

        if (validationResult && validationResult.isValid) {
            toast.loading("در حال بررسی اطلاعات...");
            forgotMutation.mutate(creds, {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("لینک بازیابی رمز عبور ارسال شد.");
                    setIsFormValid(true);
                },
                onError: (error) => {
                    console.error(error);

                    toast.dismiss();
                    toast.error("کاربری با این ایمیل ثبت نشده است.");
                },
            });
        } else {
            toast.error(String(validationResult.error?.errors));
        }
    };

    return (
        <>
            {!isFormValid ? (
                <form
                    className="flex flex-col items-center gap-l self-stretch"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-end gap-m self-stretch text-body-s font-[400]">
                        <Input
                            ref={emailElement}
                            id="email"
                            type="email"
                            labelText="ايميل خود را وارد كنيد"
                        />
                    </div>
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
        </>
    );
};

export default ForgotForm;
