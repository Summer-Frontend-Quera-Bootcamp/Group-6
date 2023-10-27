import { useTheme } from "@/context/ThemeContext";
import { AppContext } from "@/context/store";
import { IProjects } from "@/context/types/context.type";
import { getTask } from "@/services/Tasks";
import { useTasksMutation } from "@/services/Tasks/mutations/useTasksMutation";
import { useUpdateTasksMutation } from "@/services/Tasks/mutations/useUpdateTaskMutation";
import { getLastBoard } from "@/services/boards";
import { ITasksRequest } from "@/types/api.types";
import { IModalsStatus, INewTaskProps } from "@/types/newTask.types";
import { isTaskFormValid } from "@/utils/formValidator";
import useQueryParams from "@/utils/useQueryParams";
import React, {
    FormEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NewTaskForm } from "./newTaskForm";

export const NewTask: React.FC<INewTaskProps> = ({ handleClose }) => {
    const [showModals, setShowModals] = useState<IModalsStatus>({
        tags: false,
        flags: false,
        calendar: false,
    });
    const [taskData, setTaskData] = useState<ITasksRequest>({});
    const { state } = useContext(AppContext);
    const formRef = useRef<HTMLFormElement>(null);
    const { theme }: IThemeContext = useTheme();
    const taskMutation = useTasksMutation();
    const updateTaskMutation = useUpdateTasksMutation();
    const { space, project, task, mode, board: boardItem } = useQueryParams();
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
                        searchParams.delete("board");
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
                        searchParams.delete("board");
                        setSearchParams(searchParams);
                        searchParams.delete("board");
                        setSearchParams(searchParams);
                        formRef.current?.reset();
                        window.location.reload();
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

        const getDefaultBoard = async (space: number, project: number) => {
            const lastBoard = await getLastBoard(space, project);
            console.log(lastBoard?.name);

            setTaskData((prevData) => ({
                ...prevData,
                board: lastBoard?.id,
            }));
        };
        if (space && project && task && boardItem && mode === "edit") {
            getTaskData(
                Number(task),
                Number(space),
                Number(project),
                Number(boardItem)
            );
        } else if (!boardItem) {
            getDefaultBoard(Number(space), Number(project));
        } else if (boardItem) {
            setTaskData((prevData) => ({
                ...prevData,
                board: Number(boardItem),
            }));
        }
    }, [task, mode, boardItem]);

    return (
        <NewTaskForm
            taskData={taskData}
            isLoading={isLoading}
            mode={mode}
            setShowModals={setShowModals}
            setTaskData={setTaskData}
            showModals={showModals}
            handleFormSubmit={handleFormSubmit}
            formRef={formRef}
            handleClose={handleClose}
            theme={theme || "#208d8e"}
        />
    );
};
