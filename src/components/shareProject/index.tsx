import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GoLink } from "react-icons/go";
import { PiCaretDownLight } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";

interface IShareProject {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ShareProject: React.FC<IShareProject> = ({ open, setOpen }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
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
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
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
                            <Dialog.Panel className="relative w-[547px] transform rounded-lg bg-white text-left shadow-xl transition-all">
                                <div className="my-5 flex flex-row-reverse justify-between w-[507px] h-[35px] mr-auto ml-auto">
                                    <span
                                        className="w-6 m-0 p-0 cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    >
                                        <AiOutlineClose size={16} />
                                    </span>
                                    <span className="pr-2 font-heading-xs m-0">
                                        {" "}
                                        اشتراک گذاری ورک اسپيس
                                    </span>
                                    <span className="w-6"> </span>
                                </div>
                                <div className="w-[507px] mr-auto ml-auto my-5">
                                    <div className="mt-3 flex flex-row-reverse justify-start h-10 border-0 ">
                                        <input
                                            className="w-6 m-0 pr-3 grow bg-[#F0F1F3] border-0 text-right rounded-r-lg"
                                            placeholder="دعوت با ایمیل"
                                        />
                                        <div className="font-body-xs bg-brand-primary w-[91px] rounded-l-lg text-center text-white pt-2">
                                            {" "}
                                            ارسال
                                        </div>
                                    </div>
                                    <div className="flex flex-row-reverse my-5 justify-between">
                                        <div className="flex flex-row-reverse justify-start">
                                            <span className="w-6 m-0 p-0">
                                                <GoLink size={20} />
                                            </span>
                                            <span className="pr-2 font-body-s m-0">
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
                                                <img
                                                    className="w-6 h-6 rounded-full"
                                                    alt="persons picture"
                                                ></img>
                                                <span className="px-1 font-body-s">
                                                    من
                                                </span>
                                                <span className="bg-blue-secondary rounded-md font-body-xs text-blue-primary py-1 px-2">
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
                                                    <span className="font-body-xs ml-3">
                                                        دسترسی کامل
                                                    </span>
                                                    <span className="pt-1">
                                                        <PiCaretDownLight
                                                            size={16}
                                                            color={"grey"}
                                                        />{" "}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row-reverse m-0 border pt-[3px] pb-[2px] border-inherit px-3 rounded">
                                                    <span className="font-body-xs ml-3">
                                                        همه پروژه ها
                                                    </span>
                                                    <span className="pt-1">
                                                        <PiCaretDownLight
                                                            size={16}
                                                            color={"grey"}
                                                        />{" "}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row-reverse justify-between my-3">
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
                                                    <span className="font-body-xs ml-3">
                                                        دسترسی ادیت
                                                    </span>
                                                    <span className="pt-1">
                                                        <PiCaretDownLight
                                                            size={16}
                                                            color={"grey"}
                                                        />{" "}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row-reverse m-0 border pt-[3px] pb-[2px] border-inherit px-3 rounded">
                                                    <span className="font-body-xs ml-3">
                                                        پروژه اول
                                                    </span>
                                                    <span className="pt-1">
                                                        <PiCaretDownLight
                                                            size={16}
                                                            color={"grey"}
                                                        />{" "}
                                                    </span>
                                                </div>
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

export default ShareProject;
