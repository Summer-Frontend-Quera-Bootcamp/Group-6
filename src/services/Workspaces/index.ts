import { AXIOS } from "@/config/axios";
import {
    IProjects,
    IWorkspaces,
    WorkspacesData,
} from "@/context/types/context.type";

export async function fetchWorkspaces(): Promise<WorkspacesData> {
    try {
        const workspaceResponse = await AXIOS.get("/workspaces/");
        const workspaces: IWorkspaces[] = workspaceResponse.data;

        const workspacePromises = workspaces.map(async (item) => {
            const projectResponse = await AXIOS.get(
                `/workspaces/${item.id}/projects/`
            );
            const projects: IProjects[] = projectResponse.data;

            return { ...item, projects };
        });

        const workspaceData: IWorkspaces[] = await Promise.all(
            workspacePromises
        );

        return { workspaces: workspaceData };
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw error;
    }
}
