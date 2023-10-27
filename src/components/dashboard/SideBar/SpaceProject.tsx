import ModalSm from "@/components/common/ModalSm";
import * as Icon from "../../../assets/icons/icons";
import { AppContext } from "@/context/store";
import { UpdateWorkspaces } from "@/context/user/user.action";
import useClickOutside from "@/hooks/useClickOutside";
import { useRemoveProject } from "@/services/Projects/mutations/useRemoveProject";
import useQueryParams from "@/utils/useQueryParams";
import { useState, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IProjects, IWorkspaces } from "@/context/types/context.type";
import { useNewTask } from "@/context/NewTaskContext";
import EditProject from "@/components/editProject/EditProject";

interface IProjectItem {
    project: IProjects;
    space: IWorkspaces;
    selectedItem?: number;
    setSelectedItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const SpaceProject: React.FC<IProjectItem> = ({
    selectedItem,
    setSelectedItem,
    project,
    space,
}) => {
    const { space: space_id, project: project_id } = useQueryParams();
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = (state: boolean) => {
        setShowModal(state);
    };
    const modalRef = useRef<HTMLDivElement>(null);
    useClickOutside([modalRef], () => {
        handleShowModal(false);
    });
    const { setShowTaskModal } = useNewTask();
    const [showEditModal, setShowEditModal] = useState(false);

    const [, setSearchParams] = useSearchParams();

    const handleCopyLink = () => {
        const x = window.location.href;
        navigator.clipboard.writeText(x);
        toast.success("کپی لینک یا موفقیت انجام شد ");
    };
    const removeProjectMutation = useRemoveProject();
    const { dispatch } = useContext(AppContext);
    const handleDeleteProject = async () => {
        const data = {
            space_id: Number(space_id),
            project_id: Number(project_id),
        };
        toast.loading("در حال حذف");
        try {
            removeProjectMutation.mutate(data, {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("پروژه با موفقیت حذف گردید ");
                    dispatch(UpdateWorkspaces());
                },
                onError: (e) => {
                    toast.dismiss();
                    console.log(e);
                    toast.error("هنگام حذف پروژه مشکلی پیش آمده");
                },
            });
        } catch (error) {
            console.error("Error fetching workspaces:", error);
            throw error;
        }
    };

    const handleSelection = () => {
        setSearchParams({
            space: String(space.id),
            project: String(project.id),
        });
    };
    const handleClick = () => {
        setSelectedItem(project.id);
        handleSelection();
    };
    const handleShowTaskModal = () => {
        setShowTaskModal(true);
    };
    const handleShowEditModal = () => {
        setShowEditModal(true);
    };
    const rows = [
        {
            icon: Icon.Plus,
            text: "ساختن تسک جدید",
            onSubmit: handleShowTaskModal,
        },
        {
            icon: Icon.Edit,
            text: "ویرایش نام پروژه",
            onSubmit: handleShowEditModal,
        },
        { icon: Icon.LinkCopy, text: "کپی لینک", onSubmit: handleCopyLink },
        {
            icon: Icon.RedBin,
            text: "حذف",
            color: "red",
            onSubmit: handleDeleteProject,
        },
    ];
    return (
        <>
            {showEditModal && <EditProject handleClose={setShowEditModal} />}
            <span
                className={`flex justify-between mr-[28px] mb-4  cursor-pointer p-[6px] ${
                    selectedItem === project.id && " rounded-[4px] bg-cyan-100"
                }`}
                onClick={handleClick}
            >
                <p>{project.name}</p>
                {selectedItem === project.id && (
                    <img
                        src={Icon.More}
                        alt="menu icon"
                        className="cursor-pointer"
                        onClick={() => {
                            handleShowModal(true);
                        }}
                    />
                )}
                {showModal && (
                    <ModalSm
                        rows={rows}
                        ref={modalRef}
                        className="right-[300px]"
                    />
                )}
            </span>
        </>
    );
};
