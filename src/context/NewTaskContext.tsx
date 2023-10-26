import { INewTaskContext, INewTaskContextProps } from "@/types/newTask.types";
import React, { useContext, useState } from "react";

const NewTaskContext = React.createContext({} as INewTaskContext);

export const useNewTask = (): INewTaskContext => {
    return useContext(NewTaskContext);
};

export const NewTaskProvider = ({ children }: INewTaskContextProps) => {
    const [showTaskModal, setShowTaskModal] = useState(false);

    return (
        <NewTaskContext.Provider
            value={{
                showTaskModal,
                setShowTaskModal,
            }}
        >
            {children}
        </NewTaskContext.Provider>
    );
};
