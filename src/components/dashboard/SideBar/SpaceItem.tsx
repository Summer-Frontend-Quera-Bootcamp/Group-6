import ModalSm from "@/components/common/ModalSm";
import { AppContext } from "@/context/store";
import { IWorkspaces, IProjects } from "@/context/types/context.type";
import { UpdateWorkspaces } from "@/context/user/user.action";
import useClickOutside from "@/hooks/useClickOutside";
import { useRemoveWorkspace } from "@/services/Workspaces/mutations/useRemoveWorkspace";
import useQueryParams from "@/utils/useQueryParams";
import { useState, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SpaceProject } from "./SpaceProject";
import * as Icon from "../../../assets/icons/icons";
import EditSpace from "@/components/editSpace/EditSpace";

interface ISpaceItem {
    isActive?: boolean;
    space: IWorkspaces;
    selected?: number;
    setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
    setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: any;
    projects?: IProjects[];
}

export const SpaceItem: React.FC<ISpaceItem> = ({
    space,
    selected,
    setSelected,
    setShowProjectModal,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [showProject, setShowProject] = useState(false);
    const handleShowModal = (state: boolean) => {
        setShowModal(state);
    };
    const [searchParams, setSearchParams] = useSearchParams();

    const modalRef = useRef<HTMLDivElement>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditColorModal, setShowEditColorModal] = useState(false);
    const { space: space_id } = useQueryParams();
    const handleShowEditModal = () => {
        setShowEditModal(true);
    };
    const handleShowEditColorModal = () => {
        setShowEditColorModal(true);
    };
    const handleCopyLink = () => {
        const x = window.location.href;
        navigator.clipboard.writeText(x);
        toast.success("کپی لینک یا موفقیت انجام شد ");
    };
    const handleSelection = () => {
        setSearchParams({
            space: String(space.id),
        });
    };

    const removeSpaceMutation = useRemoveWorkspace();
    const { dispatch } = useContext(AppContext);
    const handleDeleteSpace = async () => {
        const data = {
            space_id: Number(space_id),
        };
        toast.loading("در حال حذف");
        try {
            removeSpaceMutation.mutate(data, {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("ورک اسپیس با موفقیت حذف گردید ");
                    dispatch(UpdateWorkspaces());
                },
                onError: (e) => {
                    toast.dismiss();
                    console.log(e);
                    toast.error("هنگام حذف ورک اسپیس  مشکلی پیش آمده");
                },
            });
        } catch (error) {
            console.error("Error fetching workspaces:", error);
            throw error;
        }
    };
    useClickOutside([modalRef], () => {
        handleShowModal(false);
    });

    const handleNewProject = () => {
        const currentParams = Object.fromEntries(searchParams);
        const updatedParams = {
            ...currentParams,
            space: String(space.id),
        };
        setSearchParams(updatedParams);
        setShowProjectModal(true);
    };
    const rows = [
        {
            icon: Icon.Plus,
            text: "ساختن پروژه جدید",
            onSubmit: handleNewProject,
        },
        {
            icon: Icon.Edit,
            text: "ویرایش نام ورک‌اسپیس",
            onSubmit: handleShowEditModal,
        },
        {
            icon: Icon.EditColor,
            text: "ویرایش رنگ",
            onSubmit: handleShowEditColorModal,
        },
        { icon: Icon.LinkCopy, text: "کپی لینک", onSubmit: handleCopyLink },
        {
            icon: Icon.RedBin,
            text: "حذف",
            color: "red",
            isSpace: true,
            onSubmit: handleDeleteSpace,
        },
    ];

    return (
        <>
            {showEditModal && <EditSpace handleClose={setShowEditModal} />}
            {showEditColorModal && (
                <EditSpace page={2} handleClose={setShowEditColorModal} />
            )}
            <div
                className="flex justify-between gap-2 cursor-pointer"
                onClick={() => {
                    setShowProject((pervState) => !pervState);
                    handleSelection();
                    setSelected(space.id);
                }}
            >
                <div className="flex items-center cursor-pointer gap-xs">
                    <span
                        className="w-[20px]  h-[20px] inline-block rounded-[4px]"
                        style={{ backgroundColor: space.color }}
                    />
                    <span>{space.name}</span>
                </div>
                {selected === space.id && (
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
            </div>

            {showProject && (
                <>
                    <ul className="self-stretch ">
                        {space.projects?.map((project) => (
                            <SpaceProject
                                project={project}
                                space={space}
                                selectedItem={selected}
                                setSelectedItem={setSelected}
                                key={project.id}
                            />
                        ))}
                    </ul>
                    <button
                        className="self-stretch p-1 rounded-[8px] border-2 border-brand-primary text-brand-primary text-sm"
                        onClick={handleNewProject}
                    >
                        ساختن پروژه جدید
                    </button>
                </>
            )}
        </>
    );
};
