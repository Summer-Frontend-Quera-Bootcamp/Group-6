import React, {
    FormEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
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

import useQueryParams from "@/utils/useQueryParams";
import { getTask } from "@/services/Tasks";
import { useUpdateTasksMutation } from "@/services/Tasks/mutations/useUpdateTaskMutation";
import { AppContext } from "@/context/store";
import { IProjects } from "@/context/types/context.type";
import { useSearchParams } from "react-router-dom";

export const NewTask: React.FC<INewTaskProps> = ({ handleClose }) => {
    const [showModals, setShowModals] = useState<IModalsStatus>({
        tags: false,
        flags: false,
        calendar: false,
    });
    const [taskData, setTaskData] = useState<ITasksRequest>({});
    const { state } = useContext(AppContext);
    const tagRef = useRef(null);
    const footerRef = useRef(null);
    const calenderRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { theme }: IThemeContext = useTheme();
    const taskMutation = useTasksMutation();
    const updateTaskMutation = useUpdateTasksMutation();
    const { space, project, task, mode, board } = useQueryParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isTaskFormValid(taskData)) {
            if (mode === "edit") {
                console.log(taskData);

                toast.dismiss();
                toast.loading("در حال ویرایش");
                updateTaskMutation.mutate(taskData, {
                    onSuccess: () => {
                        toast.dismiss();
                        toast.success("تسک با موفقیت ویرایش شد.");
                        setTaskData({});
                        formRef.current?.reset();
                        handleClose(false);
                        searchParams.delete("mode");
                        searchParams.delete("task");
                        setSearchParams(searchParams);
                        window.location.reload();
                    },
                    onError: (error) => {
                        console.log(taskData);

                        console.error(error);
                        toast.error("هنگام ویرایش تسک، مشکلی پیش آمده.");
                    },
                });
            } else {
                toast.dismiss();
                toast.loading("در حال افزودن");
                taskMutation.mutate(taskData, {
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
        }
    };

    useEffect(() => {
        const getTaskData = async (
            task: number,
            space: number,
            project: number,
            board: number
        ) => {
            const projects: IProjects[] = state.user.workspaces
                .filter(({ id }) => space === undefined || id === Number(space))
                .flatMap(
                    ({ projects, id: idx }) =>
                        projects?.map(({ id, name }) => ({ id, name, idx })) ||
                        []
                );
            const selectedProject = projects?.find(
                (p) => p && p?.id === project
            );
            const { thumbnail, attachment, ...data } = await getTask(
                space,
                project,
                board,
                task
            );
            setTaskData({
                ...data,
                project: selectedProject,
                task_id: task,
                board: board,
            });

            setIsLoading(false);
        };
        if (space && project && task && board && mode === "edit") {
            getTaskData(
                Number(task),
                Number(space),
                Number(project),
                Number(board)
            );
        }
    }, [task, mode]);

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
                            ref={calenderRef}
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
                    <span className="bg-inherit flex flex-col" ref={tagRef}>
                        {showModals.tags && <Tags />}
                        {showModals.flags && (
                            <Flags
                                taskData={taskData}
                                setTaskData={setTaskData}
                            />
                        )}
                    </span>
                    <Footer mode={mode}>
                        <span ref={footerRef}>
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
