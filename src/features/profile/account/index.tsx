import { Input, SubmitBtn } from "@components/common";
import { FormEvent } from "react";

const ProfileAccount = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

    const inputFields = [
        { id: "email", type: "email", labelText: "ایمیل" },
        { id: "username", type: "text", labelText: "نام کاربری" },
        { id: "old-pass", type: "password", labelText: "رمزعبور فعلی" },
        { id: "new-pass", type: "password", labelText: "رمز عبور جدید" },
        {
            id: "new-pass-confirm",
            type: "password",
            labelText: "تکرار رمز عبور جدید",
        },
    ];

    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">اطلاعات حساب</p>
            <form
                className="flex flex-col items-end gap-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-end gap-l w-full">
                    <div className="flex flex-col items-start gap-s self-stretch text-body-s">
                        {inputFields.map(({ id, type, labelText }) => (
                            <Input
                                key={id}
                                id={id}
                                type={type}
                                labelText={labelText}
                                classNames="text-black text-right"
                            />
                        ))}
                    </div>
                </div>
                <SubmitBtn
                    value="ثبت تغییرات"
                    className="w-[354px] font-bold text-[14px]"
                />
            </form>
        </div>
    );
};

export default ProfileAccount;
