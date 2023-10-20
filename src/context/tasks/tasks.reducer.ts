import { IContextAction, ITaskData } from "../types/context.type";
import { TaskActionTypes } from "./tasks.actiontype";

export const TasksReducer = (
    state: ITaskData[],
    action: IContextAction<TaskActionTypes, Partial<ITaskData>>
): ITaskData[] => {
    switch (action.type) {
        case TaskActionTypes.ADD_TASK:
            return [
                ...state,
                {
                    id: action.payload?.id || 0,
                    name: action.payload?.name || "",
                    description: action.payload?.description || "",
                    deadline: action.payload?.deadline || "",
                    priority: action.payload?.priority || 0,
                    attachment: action.payload?.attachment || "",
                    thumbnail: action.payload?.thumbnail || "",
                    order: action.payload?.order || 0,
                    members: action.payload?.members || "",
                },
            ];
        default:
            return state;
    }
};
