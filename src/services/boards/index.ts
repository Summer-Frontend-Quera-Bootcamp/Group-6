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
export async function fetchBoard(
    space: number | string,
    project: number | string,
    board: number | string
): Promise<IBoardData> {
    try {
        const response = await AXIOS.get(
            `/workspaces/${space}/projects/${project}/boards/${board}/`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching board:", error);
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

export const getLastBoard = async (space: number, project: number) => {
    try {
        const { boards } = await fetchBoards(space, project);
        if (Array.isArray(boards) && boards.length > 0) {
            const lastBoard = boards.reduce((prevBoard, currentBoard) => {
                return prevBoard.id > currentBoard.id
                    ? prevBoard
                    : currentBoard;
            });

            return lastBoard;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
};
