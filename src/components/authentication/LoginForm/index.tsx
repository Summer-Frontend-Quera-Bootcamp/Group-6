import { Input, SubmitBtn } from "@/components/common";
import { AppContext } from "@/context/store";
import { AuthenticateUser } from "@/context/user/user.action";
import { UseLoginMutation } from "@/services/Authentication/mutations/useLoginMutation";
import { isLoginValid } from "@/utils/formValidator";
import React, { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
    const usernameElement = useRef<HTMLInputElement>(null);
    const passElement = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const loginMutation = UseLoginMutation();
    const { dispatch } = useContext(AppContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usernameValue = usernameElement.current?.value || "";
        const passValue = passElement.current?.value || "";

        const creds = {
            username: usernameValue,
            password: passValue,
        };

        const validationResult = await isLoginValid(creds);

        if (validationResult && validationResult.isValid) {
            const { from } = location.state || { from: "/" };
            toast.loading("در حال بررسی اطلاعات...");
            loginMutation.mutate(creds, {
                onSuccess: (payload) => {
                    dispatch(AuthenticateUser(payload));
                    toast.dismiss();
                    toast.success("با موفقیت وارد شدید.");

                    navigate(from);
                },
                onError: (error) => {
                    console.error(error);

                    toast.dismiss();
                    toast.error("نام کاربری و یا رمز عبور صحیح نمی باشد.");
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
                <Input
                    ref={usernameElement}
                    id="username"
                    type="text"
                    labelText="نام کاربری"
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

            <SubmitBtn
                value="ورود"
                ariaLabel="ورود"
                className="self-stretch"
                enablePalette={false}
            />
        </form>
    );
};

export default LoginForm;
