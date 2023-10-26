import { Dispatch, ReactNode } from "react";
import { DateObject } from "react-multi-date-picker";
import { ITasksRequest } from "./api.types";

interface IModalsStatus {
    tags: boolean;
    flags: boolean;
    calendar: boolean;
}

interface IconProps {
    src: string;
    alt: string;
    property: keyof IModalsStatus;
    showModals: IModalsStatus;
    setShowModals: Dispatch<React.SetStateAction<IModalsStatus>>;
}

interface ITagsProps {
    tags: Dispatch<React.SetStateAction<IModalsStatus>>;
}

interface ITagListProps {
    tags: TagTypes[];
}

interface IFooterIconsProps {
    showModals: IModalsStatus;
    setShowModals: Dispatch<React.SetStateAction<IModalsStatus>>;
}

interface TagTypes {
    id?: string;
    name?: string;
    bgColor?: string;
    fgColor?: string;
}

interface ITagLabelProps {
    tag: TagTypes;
    icon?: string;
    showTagOptions?: TagTypes | null;
    handleOptionClick?: (newTag: TagTypes) => void;
    handleModalClose?: (newTag: TagTypes) => void;
}

interface IOptionMenuProps {
    tag: TagTypes;
}
interface ITaskData {
    id?: number;
    name?: string;
    description?: string;
    deadline?: string;
    priority?: number;
    attachment?: string;
    thumbnail?: string;
    order?: number;
    members?: string[];
}
export type TaskData = {
    name?: string;
    description?: string;
    attachment?: string | Object | File;
    thumbnail?: string | Object | File;
    priority?: number;
    order?: number;
    project?: {
        idx: number;
        id: number;
        name: string;
    };
};

export interface INewTaskProps {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IUserDetailProps {
    taskData: ITasksRequest;
    setTaskData: React.Dispatch<React.SetStateAction<TaskData>>;

    children?: ReactNode;
}

interface IHeaderProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    children?: ReactNode;
}

interface IDynamicDateEntry {
    title: string;
    date: DateObject;
}

interface INewTaskContext {
    showTaskModal: boolean;
    setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface INewTaskContextProps {
    children: React.ReactNode;
}

export type {
    IHeaderProps,
    IUserDetailProps,
    IconProps,
    ITagLabelProps,
    IFooterIconsProps,
    ITagsProps,
    TagTypes,
    IModalsStatus,
    IOptionMenuProps,
    IDynamicDateEntry,
    ITagListProps,
    INewTaskContext,
    ITaskData,
    INewTaskContextProps,
};
