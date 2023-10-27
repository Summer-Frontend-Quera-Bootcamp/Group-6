import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React, { useContext } from "react";
import { AppContext } from "@/context/store";
import * as Icon from "../../assets/icons/icons";
import { isEmailValid } from "@/utils/formValidator";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext";

interface IShareModal {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    workspace: boolean;
}
const ShareModal: React.FC<IShareModal> = ({
    open,
    setOpen,
    title,
    workspace,
}) => {
    const { state } = useContext(AppContext);
    const thumbnail = state.user.thumbnail || "";
    const [email, setEmail] = useState("");
    const handleSubmit = async () => {
        const validationResult = await isEmailValid(email);
        console.log(validationResult);
        if (validationResult && validationResult.isValid) {
            toast.success("ایمیل برای کاربر مورد نظر ارسال شد");
            setOpen(false);
        } else {
            toast.error(validationResult.error?.message);
        }
    };
    const { theme } = useTheme();
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className={`relative z-[1000] ${theme}`}
                onClose={() => setOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-40 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={`relative w-[547px] transform rounded-lg ${theme} text-left shadow-xl transition-all`}
                            >
                                <div className="my-5 flex flex-row-reverse justify-between w-[507px] h-[35px] mr-auto ml-auto">
                                    <span
                                        className="w-6 m-0 p-0 cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    >
                                        <img
                                            src={Icon.Close}
                                            alt="close icon"
                                        />
                                    </span>
                                    <span className="pr-2 font-heading-xs m-0">
                                        {" "}
                                        {title}
                                    </span>
                                    <span className="w-6"> </span>
                                </div>
                                <div className="w-[507px] mr-auto ml-auto my-5">
                                    <div className="mt-3 flex flex-row-reverse justify-start h-10 border-0 ">
                                        <input
                                            className={`w-6 m-0 pr-3 grow bg-[#F0F1F3] border-0 text-right rounded-r-lg ${theme}`}
                                            placeholder="دعوت با ایمیل"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        <div
                                            className="font-body-xs bg-brand-primary w-[91px] rounded-l-lg text-center text-white pt-2"
                                            onClick={() => handleSubmit()}
                                        >
                                            {" "}
                                            ارسال
                                        </div>
                                    </div>
                                    <div className="flex flex-row-reverse my-5 justify-between">
                                        <div className="flex flex-row-reverse justify-start">
                                            <img
                                                className="h-4 mt-2"
                                                src={Icon.LinkCopy}
                                                alt="link copy icon"
                                            />
                                            <span className="pr-2 font-body-s mt-1">
                                                لينک خصوصی
                                            </span>
                                        </div>
                                        <span className="font-body-xs m-0 border pt-[3px] pb-[2px] border-inherit px-3 rounded">
                                            كپی لينک
                                        </span>
                                    </div>
                                </div>
                                <div className=" mr-auto ml-auto w-[507px] py-2 text-sm font-semibold ">
                                    <div className="pr-2 text-[#7D828C] text-right mb-5">
                                        اشتراک گذاشته شده با
                                    </div>
                                    <div>
                                        <div className="flex flex-row-reverse justify-between ">
                                            <div className="flex flex-row-reverse">
                                                {thumbnail ? (
                                                    <img
                                                        src={thumbnail}
                                                        className=" w-[36px] h-[36px] rounded-full noFilter"
                                                    />
                                                ) : (
                                                    <span className="bg-red-primary w-[36px] h-[36px] rounded-full"></span>
                                                )}
                                                <span className="px-2 pt-2 font-body-s">
                                                    من
                                                </span>
                                                <span className="bg-blue-secondary rounded-md font-body-xs text-blue-primary pt-2 px-2">
                                                    Workspace Owner
                                                </span>
                                            </div>
                                            <span className="font-body-xs text-[#A6A7A7] border border-[#A6A7A7] p-2 rounded">
                                                دسترسی کامل
                                            </span>
                                        </div>
                                        <div className="flex flex-row-reverse justify-between my-5">
                                            <div className="flex flex-row-reverse">
                                                <div className="w-8 h-8 rounded-full bg-[#F27474] font-body-xs text-center pt-1 ">
                                                    {" "}
                                                    ZY{" "}
                                                </div>
                                                <span className="px-1 font-body-s pt-1 ">
                                                    Z.yaserinejad@Gmail.Com
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse">
                                                <div className="flex flex-row-reverse m-0 border pt-[3px] pb-[2px] border-inherit px-3 rounded">
                                                    <span className="font-body-xs">
                                                        دسترسی‌کامل
                                                    </span>
                                                    <img
                                                        src={Icon.Down}
                                                        alt="down icon"
                                                    />
                                                </div>
                                                {workspace && (
                                                    <div className="flex flex-row-reverse m-0 border pt-[3px] pb-[2px] border-inherit px-3 rounded">
                                                        <span className="font-body-xs ml-3">
                                                            همه‌پروژه‌ها
                                                        </span>
                                                        <img
                                                            src={Icon.Down}
                                                            alt="down icon"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-row-reverse justify-between my-3">
                                            <div className="flex flex-row-reverse">
                                                <div className="w-8 h-8 rounded-full bg-[#F27474] font-body-xs text-center pt-1 ">
                                                    {" "}
                                                    MR{" "}
                                                </div>
                                                <span className="px-1 font-body-s pt-1 ">
                                                    Moriyn64@Yahoo.Com
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse">
                                                <div className="flex flex-row-reverse m-0 border pt-[3px] pb-[2px] border-inherit px-3 rounded">
                                                    <span className="font-body-xs ml-3">
                                                        دسترسی‌ادیت
                                                    </span>
                                                    <img
                                                        src={Icon.Down}
                                                        alt="down icon"
                                                    />
                                                </div>
                                                {workspace && (
                                                    <div className="flex flex-row-reverse m-0 border pt-[3px] pb-[2px] border-inherit px-3 rounded">
                                                        <span className="font-body-xs ml-3">
                                                            پروژه‌اول
                                                        </span>
                                                        <img
                                                            src={Icon.Down}
                                                            alt="down icon"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ShareModal;
