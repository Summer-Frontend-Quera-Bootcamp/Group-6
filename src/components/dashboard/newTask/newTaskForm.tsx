import {
    Header,
    TaskDetail,
    FileAttachment,
    Tags,
    FooterIcons,
    Flags,
    Footer,
} from "@/components/newTask";
import CalendarForm from "@/components/newTask/Calendar";
import { ITasksRequest } from "@/types/api.types";
import { IModalsStatus } from "@/types/newTask.types";
import { onInputChange } from "@/utils/newTaskFunctions";
import { FormEvent } from "react";

export const NewTaskForm: React.FC<{
    taskData: ITasksRequest;
    isLoading: boolean;
    mode: string;
    setShowModals: React.Dispatch<React.SetStateAction<IModalsStatus>>;
    showModals: IModalsStatus;
    setTaskData: React.Dispatch<React.SetStateAction<ITasksRequest>>;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    formRef: React.RefObject<HTMLFormElement>;
    handleClose: (value: React.SetStateAction<boolean>) => void;
    theme: string;
}> = ({
    taskData,
    isLoading,
    mode,
    setShowModals,
    showModals,
    setTaskData,
    handleFormSubmit,
    formRef,
    handleClose,
    theme,
}) => {
    return (
        <form
            ref={formRef}
            className={`flex flex-col items-end bg-white w-[1100px] p-l gap-xl rounded-[20px] shadow-newTask relative justify-center ${theme} min-h-[400px]`}
            onSubmit={handleFormSubmit}
        >
            {isLoading && mode === "edit" ? (
                <p className="text-center self-center">
                    ...در حال دریافت اطلاعات تسک
                </p>
            ) : (
                <>
                    {showModals.calendar && (
                        <CalendarForm
                            setShowModal={setShowModals}
                            setTaskData={setTaskData}
                        />
                    )}
                    <Header closeModal={handleClose}>
                        <input
                            className="outline-none bg-transparent text-right text-body-xl font-[500] rtl w-[500px]"
                            placeholder="نام تسک"
                            name="name"
                            value={taskData.name || ""}
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
                    <span className="bg-inherit flex flex-col">
                        {showModals.tags && <Tags />}
                        {showModals.flags && (
                            <Flags
                                taskData={taskData}
                                setTaskData={setTaskData}
                            />
                        )}
                    </span>
                    <Footer mode={mode}>
                        <span>
                            <FooterIcons
                                setShowModals={setShowModals}
                                showModals={showModals}
                            />
                        </span>
                    </Footer>
                </>
            )}
        </form>
    );
};
