import { Input, SubmitBtn } from "@components/common";
import { FormEvent, useRef, useState } from "react";
import ProfileImg from "./assets/profile.png";
import FileInput from "./components/FileInput";

const ProfileDetails = () => {
    const [imageSrc, setImageSrc] = useState<string>(ProfileImg);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const inputFields = [
        { type: "text", labelText: "نام" },
        { type: "text", labelText: "نام خانوادگی" },
        { type: "tel", labelText: "شماره موبایل" },
    ];

    const handleChangeImage = () => {
        const file = fileInputRef.current?.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setImageSrc(reader.result);
                }
            };
        } else {
            setImageSrc(ProfileImg);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">اطلاعات فردی</p>
            <form
                className="flex flex-col items-end gap-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-end gap-l w-full">
                    <div className="flex justify-end items-center gap-s">
                        <div className="flex flex-col justify-center items-center gap-s">
                            <FileInput
                                ref={fileInputRef}
                                labelText="ویرایش تصویر پروفایل"
                                onChange={handleChangeImage}
                            />
                            <p className="text-body-xs font-[400]">
                                .این تصویر برای عموم قابل نمایش است
                            </p>
                        </div>
                        <img
                            src={imageSrc}
                            alt="Profile Image"
                            className="w-[100px] h-[100px] rounded-full"
                        />
                    </div>
                    <div className="flex flex-col items-start gap-s self-stretch text-body-s">
                        {inputFields.map(({ type, labelText }) => (
                            <Input
                                key={labelText}
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

export default ProfileDetails;
