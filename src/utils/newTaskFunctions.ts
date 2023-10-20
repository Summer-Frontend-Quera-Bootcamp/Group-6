import { ITasksRequest } from "@/types/api.types";

export const onInputChange = (
    event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    stateHanlder: React.Dispatch<React.SetStateAction<ITasksRequest>>
) => {
    const { name, value } = event.target;
    stateHanlder((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

export const onFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    stateHanlder: React.Dispatch<React.SetStateAction<ITasksRequest>>
) => {
    const { name, files } = event.target;
    stateHanlder((prevData) => ({
        ...prevData,
        [name]: files?.[0],
    }));
};
