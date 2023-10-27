import "@assets/styles/global.css";
import React, { useContext, useRef, useState } from "react";
import ModalSm from "@/components/common/ModalSm/index.tsx";
import useClickOutside from "@/hooks/useClickOutside";
import * as Icon from "../../../assets/icons/icons";
import { ITaskData } from "@/context/types/context.type";

import FlagIcon from "@/components/newTask/Flags/FlagIcon";
import { AppContext } from "@/context/store";
import { useSearchParams } from "react-router-dom";
import { useNewTask } from "@/context/NewTaskContext";
import { useDeleteTask } from "@/services/Tasks/mutations/useDeleteTask";
import useQueryParams from "@/utils/useQueryParams";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext";
import TaskInfo from "@/components/taskInfo/TaskInfo";

interface CardProps {
    data: ITaskData;
    board_id: number;
    projectTitle: string;
}

const Card: React.FC<CardProps> = ({ data, board_id, projectTitle }) => {
    const { name, deadline, priority, thumbnail } = data;
    const { state } = useContext(AppContext);
    const [hovered, setHovered] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const { setShowTaskModal } = useNewTask();
    const { theme } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showModal, setShowModal] = useState(false);
    const { space, project } = useQueryParams();
    const tasksMutation = useDeleteTask();
    const handleShowModal = (state: boolean) => {
        setShowModal(state);
    };

    const modalRef = useRef<HTMLDivElement>(null);

    useClickOutside([modalRef], () => {
        handleShowModal(false);
    });

    const handleHover = (state: boolean) => {
        setHovered(state);
    };
    const handleEditTask = () => {
        const currentParams = Object.fromEntries(searchParams);
        const updatedParams = {
            ...currentParams,
            board: String(board_id),
            task: String(data.id),
            mode: "edit",
        };
        setSearchParams(updatedParams);
        setShowTaskModal(true);
    };
    const handleRemoveTask = () => {
        const creds = {
            space_id: space,
            project_id: project,
            board_id: board_id,
            task_id: data.id,
        };
        tasksMutation.mutate(creds, {
            onSuccess: () => {
                try {
                    toast.success("تسک حذف شد");
                    location.reload();
                } catch (error) {
                    toast.error("هنگام حذف تسک مشکلی پیش آمده");
                    console.error(error);
                }
            },
            onError: (e) => {
                toast.error("هنگام حذف تسک مشکلی پیش آمده");
                console.error(e);
            },
        });
    };

    const rows = [
        { icon: Icon.Edit, text: "ویرایش تسک", onSubmit: handleEditTask },
        { icon: Icon.Plus, text: "افزودن subtask" },
        { icon: Icon.Archive, text: "آرشیو تسک" },
        { icon: Icon.Delete, text: "حذف تسک", onSubmit: handleRemoveTask },
    ];

    const month = new Intl.DateTimeFormat("fa-IR", {
        month: "short",
    }).format(new Date(deadline));
    const day = new Intl.DateTimeFormat("fa-IR", {
        day: "numeric",
    }).format(new Date(deadline));
    const persianDate = `${day} ${month}`;

    return (
        <>
            {showInfo && <TaskInfo onClose={setShowInfo} />}
            <div
                className={`card rounded-[16px]  shadow-xl  w-[250px] my-2 mx-1 p-s border relative  ${theme}`}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => {
                    handleHover(false);
                }}
            >
                {thumbnail && (
                    <img
                        src={`https://quera.iran.liara.run/${thumbnail}`}
                        alt="task attachment"
                        className={` mb-s rounded-[4px] noFilter`}
                    />
                )}
                <div className="flex items-center justify-between text-[12px] text-[#534D60] mb-s">
                    <h3>{projectTitle}</h3>
                </div>
                <div className="flex items-start gap-2 mb-s">
                    <p className="text-[12px] line-clamp-2">{name}</p>
                    <img
                        src={Icon.Description}
                        alt="icon"
                        className="cursor-pointer filtered"
                        onClick={() => setShowInfo(true)}
                    />
                </div>
                <div className="flex items-center gap-1 text-[12px] mb-s">
                    <FlagIcon priority={priority} />
                    <span className="farsi-numbers">{persianDate}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span
                        className="text-[12px] py-0.5 px-2 rounded-xl text-white"
                        style={{
                            backgroundColor: state.theme || "#208d8e",
                        }}
                    >
                        {projectTitle}
                    </span>
                </div>
                <div
                    className={`icons items-center justify-between border-t-2 mt-s p-2  ${
                        hovered ? "flex animate-fadeIn" : "hidden"
                    } hover`}
                >
                    <img
                        src={Icon.Tick}
                        alt="done"
                        className="cursor-pointer"
                    />
                    <img
                        src={Icon.More}
                        alt="menu icon"
                        className="cursor-pointer"
                        onClick={() => {
                            handleShowModal(true);
                        }}
                    />
                </div>
                {showModal && (
                    <ModalSm
                        rows={rows}
                        ref={modalRef}
                        className="bottom-2 left-2"
                    />
                )}
            </div>
        </>
    );
};

export default Card;
