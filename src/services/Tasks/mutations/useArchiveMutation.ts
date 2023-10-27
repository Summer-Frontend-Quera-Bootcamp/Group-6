import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { fetchBoards } from "@/services/boards";
import { AXIOS } from "@/config/axios";
import { IBoardArchie } from "@/types/api.types";

const fetcher = async (data: IBoardArchie): Promise<any> => {
    const { space_id, project_id } = data;

    const { boards } = await fetchBoards(Number(space_id), Number(project_id));

    await Promise.all(
        boards.map(async (board) => {
            if (board.is_archive) {
                return AXIOS.patch(
                    `/workspaces/${space_id}/projects/${project_id}/boards/${board.id}/`,
                    { name: board.name, is_archive: false }
                );
            }
        })
    );
};

const useArchive = () => {
    return useMutation<IBoardArchie, any, IBoardArchie, any>(fetcher, {
        mutationKey: ReactQueryKeys.GetArchive,
    });
};

export default useArchive;
