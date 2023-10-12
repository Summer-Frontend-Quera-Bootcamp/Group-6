import { TagTypes } from "@/types/newTask.types";

export interface ITagsContext {
    tags: TagTypes[];
    selectedTag: TagTypes | null;
    message: IMessage | null;
    inputValue: string;
    editState: string | undefined;

    loadTags: () => Promise<void>;
    selectTag: (tag?: TagTypes | null) => void;
    changeState: (id?: string) => void;
    clearMessage: (time: number) => void;
    addTag: (tag: string) => Promise<any>;
    removeTag: (id: string) => Promise<void>;
    changeInputValue: (text: string) => void;
    editTag: (id: string, newProps: TagTypes) => Promise<void>;
    updateMessage: (type: "info" | "error" | "success", msg: string) => void;
}

export interface ITagsContextProps {
    children: React.ReactNode;
}

export interface IMessage {
    type: "error" | "success" | "info";
    msg: string;
}

export interface IEditState {
    active: boolean;
    id: number | null;
}
