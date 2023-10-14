import { Input, MessageDisplay, SubmitBtn } from "@/components/common";
import { isPasswordValid } from "@/utils/formValidator";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetForm = () => {
    const [message, setMessage] = useState<{
        msg: string[] | string;
        type: "info" | "success" | "error";
    }>();
    const passElement = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleResetPassword = async (password:string) => {
        console.log(password)
        const x=window.location.href
        const token:string | undefined=x.split("token=").pop()
        console.log(token)
        try {
          const {data}  =await axios.patch(
          `https://quera.iran.liara.run/accounts/reset-password/set-password/`,{token,password,password1:password}
          )
          console.log(data)
          setMessage({
            msg: "رمز عبور با موفقيت تغيير يافت. در حال انتقال به صفحه ورود...",
            type: "success",
        });
          setTimeout(() => navigate("/login"), 1000);
        } 
        catch (error) {
            console.log(error)
        }
      }; 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passValue = passElement.current?.value || "";

        const validationResult = await isPasswordValid(passValue);

        if (validationResult.isValid) {
            try{ await handleResetPassword(passValue);;}
            catch{}
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
                        labelText="رمز عبور جدید را وارد کنید"
                    />
                </div>
            </div>
            {message && (
                <MessageDisplay messages={message.msg} type={message.type} />
            )}

            <SubmitBtn
                value="تغيير رمز عبور"
                ariaLabel="تغيير رمز عبور"
                className="self-stretch"
                enablePalette={false}
            />
        </form>
    );
};

export default ResetForm;
