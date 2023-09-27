import { Input, SubmitBtn } from "../../../components/common";
import { FormEvent } from "react";

const ProfileAccount = () => {
    // TODO: Handle Account Edit Logic
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">اطلاعات حساب</p>
            <form
                className="flex flex-col items-end gap-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-end gap-l  w-full">
                    <div className="flex flex-col items-start gap-s self-stretch text-body-s">
                        <Input
                            id="email"
                            type="email"
                            labelText="ایمیل"
                            classNames={"text-black text-right"}
                        />
                        <Input
                            id="username"
                            type="text"
                            labelText="نام کاربری"
                            classNames={"text-black text-right"}
                        />
                        <Input
                            id="old-pass"
                            type="password"
                            labelText="رمزعبور فعلی"
                            classNames={"text-black"}
                        />
                        <Input
                            id="new-pass"
                            type="password"
                            labelText="رمز عبور جدید"
                            classNames={"text-black"}
                        />
                        <Input
                            id="new-pass-confirm"
                            type="password"
                            labelText="تکرار رمز عبور جدید"
                            classNames={"text-black"}
                        />
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
