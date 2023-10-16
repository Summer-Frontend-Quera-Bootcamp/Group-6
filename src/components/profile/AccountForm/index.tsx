import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "@/context/store";
import { IUserState } from "@/context/types/context.type";
import { UpdateUser } from "@/context/user/user.action";
import { UseChangePass } from "@/services/Authentication/mutations/useChangePassMutation";
import { UseUpdateMutation } from "@/services/Authentication/mutations/useUpdateMutation";
import { IUpdateRequest } from "@/types/api.types";
import {
    isFormDataEmpty,
    AccountInputFields,
    appendAccountFormData,
} from "@/utils/profile";
import { UserInputFields } from "../DetailsForm/UserInputFields";
import { SubmitBtn } from "@/components/common";

const AccountForm = () => {
    const [userData, setUserData] = useState<IUserState>();
    const { state, dispatch } = useContext(AppContext);
    const formRef = useRef<HTMLFormElement>(null);
    const updateMutation = UseUpdateMutation();
    const changePassMutation = UseChangePass();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData();
        const passData = new FormData();
        const accountFields = ["email", "username"];
        const passwordFields = [
            "old_password",
            "new_password",
            "new_password1",
        ];

        appendAccountFormData(formData, accountFields, formRef.current);
        appendAccountFormData(passData, passwordFields, formRef.current);

        toast.loading("در حال ویرایش اطلاعات...");
        if (!isFormDataEmpty(formData)) {
            try {
                const creds: IUpdateRequest = Object.fromEntries([...formData]);

                updateMutation.mutate(creds, {
                    onSuccess: (payload) => {
                        dispatch(UpdateUser(payload));
                        setUserData(state.user);
                        toast.dismiss();
                        toast.success("با موفقیت ویرایش شد.");
                    },
                    onError: (error) => {
                        toast.dismiss();
                        toast.error(
                            String([
                                ...Object.values(error.response.data).flat(),
                            ])
                        );
                    },
                });
            } catch (error) {
                toast.error("هنگام ویرایش اطلاعات مشکلی پیش آمده.");
            }
        } else if (!isFormDataEmpty(passData)) {
            try {
                const creds: any = Object.fromEntries([...passData]);

                changePassMutation.mutate(creds, {
                    onSuccess: () => {
                        toast.dismiss();
                        toast.success("با موفقیت ویرایش شد.");
                    },
                    onError: (error) => {
                        toast.dismiss();
                        toast.error(
                            String([
                                ...Object.values(error.response.data).flat(),
                            ])
                        );
                    },
                });
            } catch (error) {
                toast.error("هنگام ویرایش اطلاعات مشکلی پیش آمده.");
            }
        } else {
            toast.dismiss();
            toast.info("لطفا اطلاعات جدید را وارد کنید.");
        }
        formRef.current.reset();
    };
    useEffect(() => {
        const loadData = async () => {
            if (!state) {
                console.error("can't get");
                return;
            }

            setUserData(state.user);
        };

        loadData();
    }, [userData, state]);

    return (
        <form
            className="flex flex-col items-end gap-xl"
            onSubmit={handleSubmit}
            ref={formRef}
        >
            <div className="flex flex-col items-end gap-l w-full">
                <div className="flex flex-col items-start gap-s self-stretch text-body-s">
                    {userData && (
                        <UserInputFields
                            userData={userData}
                            inputFields={AccountInputFields}
                        />
                    )}
                </div>
            </div>
            <SubmitBtn
                value="ثبت تغییرات"
                className="w-[354px] font-bold text-[14px]"
            />
        </form>
    );
};

export default AccountForm;
