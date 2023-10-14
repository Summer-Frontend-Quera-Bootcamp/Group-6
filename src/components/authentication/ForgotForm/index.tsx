import { Input, MessageDisplay, SubmitBtn } from "@/components/common";
import { useMessages } from "@/context/MessagesContext";
import { isEmailValid } from "@/utils/formValidator";
import React, { useRef, useState } from "react";
import axios from "axios";

const ForgotForm = () => {
    const mailElement = useRef<HTMLInputElement>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const { messages, updateMessage } = useMessages();

    const handleForgotPassword = async (email:string)  => {
        try {
          const {data}  =await axios.post(
          "https://quera.iran.liara.run/accounts/reset-password/",{email}
        )
           console.log(data)
           setIsFormValid(true);
        } 
        catch (error:any) {
            if(error.response?.data.detail == 'There is no user with provided email'){
              const errorMsg = "کاربری با این ایمیل ثبت نشده است";
              updateMessage("error", errorMsg ,3000);  
              console.log(errorMsg)
            }
        }
      }; 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = mailElement.current?.value || "";
        const validationResult = await isEmailValid(emailValue);

        if (validationResult.isValid) {
            try{ await handleForgotPassword(emailValue);}
            catch{}
        } else {
            const errorMsg = validationResult.error
                ? validationResult.error?.errors
                : "هنگام ثبت نام مشکلی پیش آمده";
            updateMessage("error", errorMsg);
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
                            ref={mailElement}
                            id="email"
                            type="email"
                            labelText="ايميل خود را وارد كنيد"
                        />
                    </div>
                    {messages && messages?.type !== "success" && (
                        <MessageDisplay
                            messages={messages.msg}
                            type={messages.type}
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
        </>
    );
};

export default ForgotForm;