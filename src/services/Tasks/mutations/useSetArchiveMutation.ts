import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { IBoardArchie } from "@/types/api.types";

const fetcher = (data: IBoardArchie): Promise<any> => {
    const { space_id, project_id, board } = data;

    return AXIOS.patch(
        `/workspaces/${space_id}/projects/${project_id}/boards/${board?.id}/`,
        { name: board?.name, is_archive: true }
    );
};

const useSetArchive = () => {
    return useMutation<IBoardArchie, any, IBoardArchie, any>(fetcher, {
        mutationKey: ReactQueryKeys.SetArchive,
    });
};

export default useSetArchive;
