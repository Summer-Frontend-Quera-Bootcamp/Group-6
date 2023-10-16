import { SubmitBtn } from "@/components/common";
import { AppContext } from "@/context/store";
import { IUserState } from "@/context/types/context.type";
import { UpdateUser } from "@/context/user/user.action";
import { UseUpdateMutation } from "@/services/Authentication/mutations/useUpdateMutation";
import { IUpdateRequest } from "@/types/api.types";
import {
    appendDetailsFormData,
    DetailsInputFields,
    isFormDataEmpty,
} from "@/utils/profile";
import ProfileImg from "@assets/images/profile.png";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ProfileImage from "./ProfileImage";
import { UserInputFields } from "./UserInputFields";

const DetailsForm = () => {
    const [imageSrc, setImageSrc] = useState<string>(ProfileImg);
    const [userData, setUserData] = useState<IUserState>();
    const { state, dispatch } = useContext(AppContext);
    const formRef = useRef<HTMLFormElement>(null);
    const updateMutation = UseUpdateMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData();
        const { first_name, last_name, phone_number, thumbnail } =
            formRef.current;

        appendDetailsFormData(formData, "first_name", first_name.value);
        appendDetailsFormData(formData, "last_name", last_name.value);
        appendDetailsFormData(formData, "phone_number", phone_number.value);
        thumbnail.files?.[0] &&
            appendDetailsFormData(formData, "thumbnail", thumbnail.files?.[0]);

        if (isFormDataEmpty(formData)) {
            toast.info("لطفا اطلاعات جدید را وارد کنید.");
            return;
        }
        if (phone_number.value && phone_number.value.length < 10) {
            toast.error("فرمت تلفن همراه صحیح نمی باشد.");
            formRef.current.reset();
            return;
        }
        try {
            toast.loading("در حال ویرایش اطلاعات...");
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
                        String([...Object.values(error.response.data).flat()])
                    );
                },
            });
        } catch (error) {
            toast.error("هنگام ویرایش اطلاعات مشکلی پیش آمده.");
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
            setImageSrc(state.user.thumbnail || ProfileImg);
        };

        loadData();
    }, [userData, state]);

    return (
        <form
            className="flex flex-col items-end gap-xl"
            onSubmit={handleSubmit}
            ref={formRef}
            encType="multipart/form-data"
        >
            <div className="flex flex-col items-end gap-l w-full">
                <ProfileImage setImageSrc={setImageSrc} imageSrc={imageSrc} />
                {userData && (
                    <UserInputFields
                        userData={userData}
                        inputFields={DetailsInputFields}
                    />
                )}
            </div>
            <SubmitBtn
                value="ثبت تغییرات"
                className="w-[354px] font-bold text-[14px]"
            />
        </form>
    );
};

export default DetailsForm;
