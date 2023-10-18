import { Input, SubmitBtn } from "@/components/common";
import { UseResetPassMutation } from "@/services/Authentication/mutations/useResetPassMutation";
import { isPasswordValid } from "@/utils/formValidator";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetForm = () => {
    const passElement = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const ResetPassMutation = UseResetPassMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passValue = passElement.current?.value || "";
        const x = window.location.href;
        const tokenValue: string | undefined = x.split("token=").pop();
        
        const creds = {
            token: tokenValue,
            password: passValue, 
            password1: passValue,
        };

        const validationResult = await isPasswordValid(passValue);

        if (validationResult && validationResult.isValid) {
            const { from } = location.state || { from: "/login" };
            toast.loading("در حال بررسی اطلاعات...");
            ResetPassMutation.mutate(creds, {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("رمز عبور با موفقیت تغییر یافت.");
                    navigate(from);
                },
                onError: (error) => {
                    console.error(error);
                    toast.dismiss();
                    toast.error("مشکلی در ارسال اطلاعات");
                },
            });
        } else {
            toast.error(String(validationResult.error?.errors));
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
