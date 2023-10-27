import FileInput from "@/components/profile/DetailsForm/FileInput";
import { handleChangeImage } from "@/utils/profile";
import { useRef } from "react";

interface IProfileImgProps {
    setImageSrc: React.Dispatch<React.SetStateAction<string>>;
    imageSrc: string;
}

const ProfileImage: React.FC<IProfileImgProps> = ({
    setImageSrc,
    imageSrc,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="flex justify-end items-center align-middle gap-s">
            <div className="flex flex-col justify-center items-center gap-s">
                <FileInput
                    ref={fileInputRef}
                    labelText="ویرایش تصویر پروفایل"
                    onChange={() =>
                        handleChangeImage(fileInputRef, setImageSrc, imageSrc)
                    }
                />
                <p className="text-body-xs font-[400]">
                    .این تصویر برای عموم قابل نمایش است
                </p>
            </div>
            <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-blue-300 text-blue-700">
                {imageSrc !== "https://quera.iran.liara.run" ? (
                    <img
                        src={imageSrc}
                        className="w-[100px] h-[100px] rounded-full noFilter"
                    />
                ) : (
                    <p>تصویری ندارید</p>
                )}
            </div>
        </div>
    );
};

export default ProfileImage;
