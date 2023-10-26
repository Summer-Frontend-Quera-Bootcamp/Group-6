import { useState, useRef } from "react";
import logo from "@assets/images/logo.svg";
import { ToggleTheme } from "@components/common";
import * as Icon from "../../../assets/icons/icons";
import useClickOutside from "@/hooks/useClickOutside";
import ModalSm from "@/components/common/ModalSm/index.tsx";
import React, { useContext } from "react";
import { AppContext } from "@/context/store";
import { Link, useNavigate } from "react-router-dom";
import { LogoutUser } from "@/context/user/user.action";
import { IProjects, IWorkspaces } from "@/context/types/context.type";

interface IProjectItem {
    project: IProjects;
    space: IWorkspaces;
    selectedItem?: number;
    setSelectedItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface ISpaceItem {
    isActive?: boolean;
    space: IWorkspaces;
    selected?: number;
    setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
    onClick?: any;
    projects?: IProjects[];
}

const SpaceProject: React.FC<IProjectItem> = ({
    selectedItem,
    setSelectedItem,
    project,
    space,
}) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = (state: boolean) => {
        setShowModal(state);
    };
    const modalRef = useRef<HTMLDivElement>(null);
    useClickOutside([modalRef], () => {
        handleShowModal(false);
    });
    const rows = [
        { icon: Icon.Plus, text: "ساختن تسک جدید" },
        { icon: Icon.Edit, text: "ویرایش نام پروژه" },
        { icon: Icon.LinkCopy, text: "کپی لینک" },
        { icon: Icon.RedBin, text: "حذف", color: "red"  },
    ];
    return (
        <>
            <Link
                to={{
                    search: `?space=${space.id}&project=${project.id}`,
                }}
                className={`flex justify-between mr-[28px] mb-4  cursor-pointer p-[6px] ${
                    selectedItem === project.id && " rounded-[4px] bg-cyan-100"
                }`}
                onClick={() => setSelectedItem(project.id)}
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
            </Link>
            {showModal && (
                <ModalSm
                    rows={rows}
                    ref={modalRef}
                    className="bottom-[100px] right-[300px]"
                />
            )}
        </>
    );
};

const SpaceItem: React.FC<ISpaceItem> = ({ space, selected, setSelected }) => {
    const [showModal, setShowModal] = useState(false);
    const [showProject, setShowProject] = useState(false);
    const handleShowModal = (state: boolean) => {
        setShowModal(state);
    };
    const modalRef = useRef<HTMLDivElement>(null);
    const rows = [
        { icon: Icon.Plus, text: "ساختن پروژه جدید" },
        { icon: Icon.Edit, text: "ویرایش نام ورک‌اسپیس" },
        { icon: Icon.EditColor, text: "ویرایش رنگ" },
        { icon: Icon.LinkCopy, text: "کپی لینک" },
        { icon: Icon.RedBin, text: "حذف", color: "red", isSpace:true },
    ];

    useClickOutside([modalRef], () => {
        handleShowModal(false);
    });
    return (
        <>
            <div
                className="flex justify-between gap-2 cursor-pointer"
                onClick={() => {
                    setShowProject((pervState) => !pervState);
                    console.log(space.projects);
                }}
            >
                <div className="flex items-center cursor-pointer gap-xs">
                    <span
                        className="w-[20px]  h-[20px] inline-block rounded-[4px]"
                        style={{ backgroundColor: space.color }}
                    />
                    <span
                        onClick={() => {
                            setSelected(space.id);
                        }}
                    >
                        {space.name}
                    </span>
                </div>

                {selected === space.id ? (
                    <img
                        src={Icon.More}
                        alt="menu icon"
                        className="cursor-pointer"
                        onClick={() => {
                            handleShowModal(true);
                        }}
                    />
                ) : (
                    " "
                )}
            </div>
            {showModal && (
                <ModalSm
                    rows={rows}
                    ref={modalRef}
                    className="bottom-[110px] right-[300px]"
                />
            )}
            {showProject && (
                <ul className="self-stretch ">
                    {space.projects &&
                        space.projects.map((project) => (
                            <SpaceProject
                                project={project}
                                space={space}
                                selectedItem={selected}
                                setSelectedItem={setSelected}
                                key={project.id}
                            />
                        ))}
                </ul>
            )}
        </>
    );
};

const SideBar: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const [selected, setSelected] = useState<number | undefined>(1);

    const firstname = state.user.first_name || "";
    const lastname = state.user.last_name || "";
    const thumbnail = state.user.thumbnail || "";
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(LogoutUser());
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-start justify-between pr-[50px] pl-4 pt-[40px] border-l-2 w-[340px] min-w-[300px] h-[100vh] bg-inherit">
            <div className="flex flex-col gap-s">
                <img src={logo} alt="logo" />
                <div className="flex items-center justify-between self-stretch">
                    <span>ورک‌اسپیس‌ها</span>
                    <img src={Icon.Arrow} alt="arrow icon" />
                </div>
                <div className="relative self-stretch">
                    <img
                        src={Icon.Search}
                        alt="search icon"
                        className="absolute top-1 right-1 z-50 text-[12px]"
                    />
                    <input
                        type="text"
                        placeholder="جستجو کنید"
                        className="bg-gray-100 p-1 pr-9 relative w-[100%] rounded-[4px] text-[12px]"
                    />
                </div>
                <button className="bg-[#D3D3D3] self-stretch p-1 rounded-[6px] flex items-center justify-center gap-1">
                    <img src={Icon.Add} alt="add icon" />
                    <span className="text-[12px]">ساختن اسپیس جدید</span>
                </button>

                {state.user.workspaces.length !== 0 ? (
                    state.user.workspaces.map((space) => (
                        <SpaceItem
                            space={space}
                            selected={selected}
                            setSelected={setSelected}
                            key={space.id}
                        />
                    ))
                ) : (
                    <span className="text-brand-primary text-sm">
                        ساختن پروژه جدید
                    </span>
                )}
                <button className="self-stretch p-1 rounded-[8px] border-2 border-brand-primary">
                    <span className="text-brand-primary text-sm">
                        ساختن پروژه جدید
                    </span>
                </button>
            </div>
            <div className="pb-[40px] self-stretch">
                <Link
                    to="/profile"
                    className="flex gap-3 items-center mb-6 cursor-pointer"
                >
                    <div className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-blue-300 text-blue-700">
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                className=" w-[36px] h-[36px] rounded-full"
                            />
                        ) : (
                            "کاربر"
                        )}
                    </div>
                    <span>{`${firstname} ${lastname}`}</span>
                </Link>
                <div className="flex items-center justify-between pl-[20px]">
                    <span
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={handleLogOut}
                    >
                        <img src={Icon.Exit} alt="exit icon" />
                        <span className="text-gray-400">خروج</span>
                    </span>
                    <span style={{ direction: "ltr" }}>
                        <ToggleTheme />
                    </span>
                </div>
            </div>
        </div>
    );
};
export default SideBar;
