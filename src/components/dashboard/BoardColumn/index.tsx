import { useState, useRef } from "react";
import Card from "../Card";
import * as Icon from "@/assets/icons/icons";
import ModalSm from "@/components/common/ModalSm/index.tsx";
import useClickOutside from "@/hooks/useClickOutside.ts";
import { IBoardData } from "@/context/types/context.type";
import { useNewTask } from "@/context/NewTaskContext";
import { useSearchParams } from "react-router-dom";
import EditBoard from "@/components/editBoard/EditBoard";
import { useDeleteBoards } from "@/services/boards/mutations/useDeleteBoards";
import useQueryParams from "@/utils/useQueryParams";
import { toast } from "react-toastify";
import useSetArchive from "@/services/Tasks/mutations/useSetArchiveMutation";

interface BoardProps {
    board: IBoardData;
    projectTitle: string;
}

const BoardColumn: React.FC<BoardProps> = ({ board, projectTitle }) => {
    const [showOptions, setShowOptions] = useState(false);
    const handleOptions = (state: boolean) => {
        setShowOptions(state);
    };
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleShowModal = (state: boolean) => {
        setShowModal(state);
    };
    const { setShowTaskModal } = useNewTask();
    const { space, project } = useQueryParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const boardsMutation = useDeleteBoards();

    const modalRef = useRef<HTMLDivElement>(null);

    useClickOutside([modalRef], () => {
        handleShowModal(false);
    });

    const [hovered, setHovered] = useState(false);
    const handleHovered = (state: boolean) => {
        setHovered(state);
    };
    const handleNewTask = () => {
        const currentParams = Object.fromEntries(searchParams);
        const updatedParams = {
            ...currentParams,
            board: String(board.id),
        };
        setSearchParams(updatedParams);
        setShowTaskModal(true);
    };
    const handleEdit = () => {
        const currentParams = Object.fromEntries(searchParams);
        const updatedParams = {
            ...currentParams,
            board: String(board.id),
        };
        setSearchParams(updatedParams);
        setShowEditModal(true);
    };
    const handleRemove = () => {
        const creds = {
            space_id: space,
            project_id: project,
            board_id: board.id,
        };
        boardsMutation.mutate(creds, {
            onSuccess: () => {
                try {
                    toast.success("بورد حذف شد");
                    location.reload();
                } catch (error) {
                    toast.error("هنگام حذف بورد مشکلی پیش آمده");
                    console.error(error);
                }
            },
            onError: (e) => {
                toast.error("هنگام حذف بورد مشکلی پیش آمده");
                console.error(e);
            },
        });
    };
    const archiveMutation = useSetArchive();
    const archiveBoard = () => {
        const creds = {
            space_id: space,
            project_id: project,
            board: board,
        };

        archiveMutation.mutate(creds, {
            onSuccess: () => {
                try {
                    toast.success("بور با موفقیت آرشیو شد");
                    window.location.reload();
                } catch (error) {
                    toast.error(" آرشیو بورد با مشکل مواجه شد");
                    console.error(error);
                }
            },
            onError: (error) => {
                toast.error(" آرشیو بورد با مشکل مواجه شد");
                console.error(error);
            },
        });
    };
    const rows = [
        { icon: Icon.Edit, text: "ویرایش نام ستون", onSubmit: handleEdit },
        { icon: Icon.Plus, text: "افزودن تسک", onSubmit: handleNewTask },
        {
            icon: Icon.Archive,
            text: "آرشیو تمام تسک‌ها",
            onSubmit: archiveBoard,
        },
        { icon: Icon.Delete, text: "حذف ستون", onSubmit: handleRemove },
    ];

    return (
        <>
            {showEditModal && <EditBoard handleClose={setShowEditModal} />}
            {!board.is_archive && (
                <div
                    className={`flex flex-col mx-2`}
                    onMouseEnter={() => handleHovered(true)}
                    onMouseLeave={() => {
                        handleHovered(false);
                    }}
                >
                    <div
                        className={`w-[258px] flex items-center justify-between border-t-2 rounded-[16px] shadow-xl   py-2 px-3 my-2 relative`}
                        style={{ borderColor: board.color }}
                        onMouseEnter={() => handleOptions(true)}
                        onMouseLeave={() => {
                            handleOptions(false);
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <h2>{board.name}</h2>
                            <p className="text-xs p-1 rounded-lg">
                                {board.tasks_count}
                            </p>
                        </div>
                        {showOptions && (
                            <div className="flex items-center animate-fadeIn">
                                <img
                                    src={Icon.More}
                                    alt="more"
                                    onClick={() => {
                                        handleShowModal(true);
                                    }}
                                />
                                <img
                                    src={Icon.Plus}
                                    alt="add"
                                    onClick={handleNewTask}
                                />
                            </div>
                        )}
                        {showModal && (
                            <ModalSm
                                rows={rows}
                                ref={modalRef}
                                className="top-11 left-0"
                            />
                        )}
                    </div>

                    {board.tasks.map((task) => (
                        <Card
                            key={task.id}
                            data={task}
                            board_id={board.id}
                            projectTitle={projectTitle}
                        />
                    ))}

                    {hovered && (
                        <button
                            className="border-2 border-brand-primary text-brand-primary text-sm font-extrabold rounded-lg flex items-center justify-center gap-2 py-1.5 m-2 animate-fadeIn"
                            onClick={handleNewTask}
                        >
                            <img src={Icon.AddBrand} alt="Add icon" />
                            ساختن تسک جدید
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
export default BoardColumn;
