import { Dispatch } from "react";
import { DateObject } from "react-multi-date-picker";

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

interface IUserDetailProps {
    spaceName: string;
}

interface IHeaderProps {
    taskName: string;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDynamicDateEntry {
    title: string;
    date: DateObject;
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
};
