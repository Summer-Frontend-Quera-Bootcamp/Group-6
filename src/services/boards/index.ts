import { AXIOS } from "@/config/axios";
import { IAppContextState, IBoardData } from "@/context/types/context.type";

export async function fetchBoards(
    space: number,
    project: number
): Promise<{ boards: IBoardData[]; projectName: string }> {
    try {
        const [boardsResponse, thisProjectResponse] = await Promise.all([
            AXIOS.get(`/workspaces/${space}/projects/${project}/boards/`),
            AXIOS.get(`/workspaces/${space}/projects/${project}/`),
        ]);

        const boards: IBoardData[] = boardsResponse.data;
        const projectName = thisProjectResponse.data.name;

        return { boards, projectName };
    } catch (error) {
        console.error("Error fetching boards:", error);
        throw error;
    }
}

export const fetchBoardsData = async (
    state: IAppContextState,
    project: string,
    space: string
) => {
    const currentWorkspace = state.user.workspaces.find(
        (workspace) => workspace.id === Number(space)
    );
    if (currentWorkspace) {
        const currentProject = currentWorkspace.projects?.find(
            (proj) => proj.id === Number(project)
        );

        if (currentProject) {
            try {
                const { boards, projectName } = await fetchBoards(
                    currentWorkspace.id,
                    currentProject.id
                );
                return { boards, projectName };
            } catch (error) {
                console.error("Error while getting data:", error);
            }
        } else {
            console.error("Error while getting project:");
        }
    }
};
