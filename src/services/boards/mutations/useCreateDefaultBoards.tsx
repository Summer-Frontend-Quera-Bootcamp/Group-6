import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IDefaultBoardData, IBoardDataItem } from "@/types/api.types";

const fetcher = (data: IDefaultBoardData): Promise<any> => {
    const defaultData: IBoardDataItem[] = [
        { name: "Pending", order: 1, is_archive: false, color: "blue" },
        { name: "InProgress", order: 2, is_archive: false, color: "green" },
        { name: "Done", order: 3, is_archive: false, color: "red" },
    ];

    try {
        const createBoardPromises = defaultData.map((boardData) =>
            AXIOS.post(
                `/workspaces/${data.space_id}/projects/${data.project_id}/boards/`,
                boardData
            )
        );

        return Promise.all(createBoardPromises);
    } catch (error) {
        console.error("Error creating default boards:", error);
        throw error;
    }
};

export const useCreateDefaultBoards = () => {
    return useMutation<IDefaultBoardData, any, IDefaultBoardData, any>(
        fetcher,
        {
            mutationKey: ReactQueryKeys.CreateDefBoard,
        }
    );
};
