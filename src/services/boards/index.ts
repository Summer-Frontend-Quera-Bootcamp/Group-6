import { AXIOS } from "@/config/axios";
import {IBoardData, ITaskData} from "@/context/types/context.type";


export async function fetchBoards(space:string,project:string): Promise<any> {
            try {
                const BoardsResponse = await AXIOS.get(`/workspaces/${space}/projects/${project}/boards/`);
                const thisProject = await AXIOS.get(`/workspaces/${space}/projects/${project}/`);
                const boards: IBoardData[] = BoardsResponse.data;
                const projectName = thisProject.data.name
        
                const boardsPromises = boards.map(async (item) => {
                const tasksResponse = await AXIOS.get(
                        `/workspaces/${space}/projects/${project}/boards/${item.id}/tasks/`
                    );
                    const tasks: ITaskData[] = tasksResponse.data;
                    return { ...item, tasks };
                });
        
                const boardData: IBoardData[] = await Promise.all(
                    boardsPromises
                );
                return  {boards ,boardData, projectName};
    
            } catch (error) {
                console.error("Error fetching boards:", error);
                throw error;
            }
        }