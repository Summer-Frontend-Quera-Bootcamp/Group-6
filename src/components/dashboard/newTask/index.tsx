import React, { FormEvent, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
    FileAttachment,
    Flags,
    Footer,
    FooterIcons,
    Header,
    Tags,
    TaskDetail,
} from "@components/newTask";
import CalendarForm from "@components/newTask/Calendar";
import { IModalsStatus, INewTaskProps } from "@/types/newTask.types";
import { toast } from "react-toastify";
import { useTasksMutation } from "@/services/Tasks/mutations/useTasksMutation";
import { ITasksRequest } from "@/types/api.types";
import { onInputChange } from "@/utils/newTaskFunctions";
import { isTaskFormValid } from "@/utils/formValidator";

export const NewTask: React.FC<INewTaskProps> = ({ handleClose }) => {
    const [showModals, setShowModals] = useState<IModalsStatus>({
        tags: false,
        flags: false,
        calendar: false,
    });
    const [taskData, setTaskData] = useState<ITasksRequest>({ priority: 5 });
    const tagRef = useRef(null);
    const footerRef = useRef(null);
    const calenderRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);

    const { theme }: IThemeContext = useTheme();
    const taskMutation = useTasksMutation();

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isTaskFormValid(taskData)) {
            toast.dismiss();
            toast.loading("در حال افزودن");
            await taskMutation.mutate(taskData, {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("تسک با موفقیت افزوده شد.");
                    setTaskData({});
                    formRef.current?.reset();
                },
                onError: (error) => {
                    console.error(error);
                    toast.error("هنگام افزودن تسک، مشکلی پیش آمده.");
                },
            });
        }
    };

    return (
        <form
            ref={formRef}
            className={`flex flex-col items-end bg-white w-[1100px] p-l gap-xl rounded-[20px] shadow-newTask relative justify-center ${theme}`}
            onSubmit={handleFormSubmit}
        >
            {showModals.calendar && (
                <CalendarForm
                    ref={calenderRef}
                    setShowModal={setShowModals}
                    setTaskData={setTaskData}
                />
            )}
            <Header closeModal={handleClose}>
                <input
                    className="outline-none bg-transparent text-right text-body-xl font-[500] rtl"
                    placeholder="نام تسک"
                    name="name"
                    onChange={(e) => onInputChange(e, setTaskData)}
                />
            </Header>
            <TaskDetail taskData={taskData} setTaskData={setTaskData} />
            <FileAttachment
                name="attachment"
                title="پیوست"
                setTaskData={setTaskData}
            />
            <FileAttachment
                name="thumbnail"
                title="کاور"
                setTaskData={setTaskData}
            />
            <span className="bg-inherit flex flex-col" ref={tagRef}>
                {showModals.tags && <Tags />}
                {showModals.flags && <Flags setTaskData={setTaskData} />}
            </span>
            <Footer>
                <span ref={footerRef}>
                    <FooterIcons
                        setShowModals={setShowModals}
                        showModals={showModals}
                    />
                </span>
            </Footer>
        </form>
    );
};
