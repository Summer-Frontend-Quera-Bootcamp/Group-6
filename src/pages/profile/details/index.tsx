import { FormEvent, useEffect, useRef, useState } from "react";
import FileInput from "@components/details/FileInput";
import { Input, MessageDisplay, SubmitBtn } from "@components/common";
import { updateAccount } from "@/services/Accounts";
import { useMessages } from "@/context/MessagesContext";
import {
    appendFormData,
    handleChangeImage,
    inputFields,
    isFormDataEmpty,
} from "@/utils/profile";
import UserData from "@/types/userData.types";
import ProfileImg from "@assets/images/profile.png";
import { getAccount } from "@/services/Accounts";

const ProfileDetails = () => {
    const [imageSrc, setImageSrc] = useState<string>(ProfileImg);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [userData, setUserData] = useState<UserData>();
    const { messages, updateMessage } = useMessages();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;

        const formData = new FormData();
        const { first_name, last_name, phone_number } = formRef.current;
        appendFormData(formData, "first_name", first_name.value);
        appendFormData(formData, "last_name", last_name.value);
        appendFormData(formData, "phone_number", phone_number.value);

        const file = fileInputRef.current?.files?.[0];
        if (file && file.name !== imageSrc) {
            formData.append("thumbnail", file);
        }

        if (isFormDataEmpty(formData)) {
            updateMessage("info", "لطفا اطلاعات جدید را وارد کنید.", 3000);
            return;
        }

        try {
            updateMessage("info", "درحال ویرایش اطلاعات....");
            await updateAccount(formData);
            updateMessage("success", "اطلاعات با موفقیت ویرایش شد.", 2000);
            const data = await getAccount();
            setUserData(data);
        } catch (error) {
            console.error("Error updating account", error);
            updateMessage(
                "error",
                "هنگام ویرایش اطلاعات مشکلی پیش آمده.",
                2000
            );
        }

        formRef.current.reset();
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getAccount();

                if (data && data.thumbnail) {
                    setUserData(data);
                    if (data.thumbnail !== null) setImageSrc(data.thumbnail);
                } else {
                    console.error("can't get");
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, []);

    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">اطلاعات فردی</p>
            <form
                className="flex flex-col items-end gap-xl"
                onSubmit={handleSubmit}
                ref={formRef}
            >
                <div className="flex flex-col items-end gap-l w-full">
                    <div className="flex justify-end items-center gap-s">
                        <div className="flex flex-col justify-center items-center gap-s">
                            <FileInput
                                ref={fileInputRef}
                                labelText="ویرایش تصویر پروفایل"
                                onChange={() =>
                                    handleChangeImage(
                                        fileInputRef,
                                        setImageSrc,
                                        imageSrc
                                    )
                                }
                            />
                            <p className="text-body-xs font-[400]">
                                .این تصویر برای عموم قابل نمایش است
                            </p>
                        </div>
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt="Profile Image"
                                className="w-[100px] h-[100px] rounded-full"
                            />
                        ) : (
                            <p>در حال بارگیری</p>
                        )}
                    </div>
                    {messages && (
                        <MessageDisplay
                            messages={messages.msg}
                            type={messages.type}
                        />
                    )}
                    <div className="flex flex-col items-start gap-s self-stretch text-body-s">
                        {inputFields.map(({ type, labelText, name }) => (
                            <Input
                                key={name}
                                type={type}
                                labelText={labelText}
                                classNames="text-black text-right"
                                name={name}
                                placeholder={userData?.[name as keyof UserData]}
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

export default ProfileDetails;
