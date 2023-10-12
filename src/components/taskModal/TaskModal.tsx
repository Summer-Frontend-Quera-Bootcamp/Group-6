import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GoLink, GoShareAndroid } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

export default function TaskModal() {
    const [open, setOpen] = useState(true);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                            <Dialog.Panel className="relative w-[184px] h-[225px]  my-1 transform rounded-lg bg-white text-left shadow-xl transition-all">
                                <div className="w-[160px] h-[144px] mr-auto ml-auto">
                                    <div className="mt-4 flex flex-row-reverse justify-start ">
                                        <span className="w-6 m-0 p-0">
                                            {" "}
                                            <IoMdAdd size={20} />
                                        </span>
                                        <span className="pr-2 font-body-s m-0  whitespace-nowrap">
                                            ساختن تسک جديد
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-row-reverse justify-start ">
                                        <span className="w-6 m-0 p-0">
                                            {" "}
                                            <FiEdit size={20} />
                                        </span>
                                        <span className="pr-2 font-body-s m-0">
                                            ويرايش‌ نام پروژه
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-row-reverse justify-start ">
                                        <span className="w-6 m-0 p-0">
                                            {" "}
                                            <GoLink size={20} />
                                        </span>
                                        <span className="pr-2 font-body-s m-0">
                                            كپی لينک
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-row-reverse justify-start text-red-primary ">
                                        <span className="w-6 m-0 p-0">
                                            {" "}
                                            <RiDeleteBinLine size={20} />
                                        </span>
                                        <span className="pr-2 font-body-s m-0">
                                            {" "}
                                            حذف
                                        </span>
                                    </div>
                                </div>
                                <div className="  flex flex-row-reverse mr-auto ml-auto my-3 w-[160px] h-[36px] rounded-md bg-brand-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:cursor-pointer ">
                                    <span>
                                        {" "}
                                        <GoShareAndroid size={24} />
                                    </span>
                                    <span className="pr-2 font-body-xs">
                                        {" "}
                                        اشتراک گذاری
                                    </span>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
