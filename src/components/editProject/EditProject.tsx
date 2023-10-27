import { AppContext } from "@/context/store";
import { useEditProject } from "@/services/Projects/mutations/useEditProject";
import useQueryParams from "@/utils/useQueryParams";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ColorSelectionView from "../common/newModal/ColorSelectionView";
import Inputs from "../common/newModal/Input";
import NewItemModal from "../common/newModal/NewItemModal";
import SummaryView from "../common/newModal/SummaryView";

const EditProject = ({
    handleClose,
}: {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState<{ name: string; color?: string }>({
        name: "",
        color: "",
    });
    const { space, project } = useQueryParams();
    const { state } = useContext(AppContext);
    let handler = () => {
        if (Page !== 3) {
            setPage((page) => page + 1);
        }
    };

    let prev = () => {
        setPage((page) => page - 1);
    };

    const projectMutation = useEditProject();
    const handleSubmitForm = () => {
        const creds = {
            space_id: Number(space),
            project_id: Number(project),
            name: Data.name,
        };
        projectMutation.mutate(creds, {
            onSuccess: () => {
                try {
                    toast.success("پروژه ویرایش شد");
                    handleClose(false);
                    location.reload();
                } catch (error) {
                    toast.error("هنگام ویرایش پروژه مشکلی پیش آمده");
                    console.error(error);
                }
            },
            onError: (e) => {
                toast.error("هنگام ساخت پروژه مشکلی پیش آمده");
                console.error(e);
            },
        });
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const workspace = state.user.workspaces.find(
                    (ws) => ws.id === Number(space)
                );
                if (workspace) {
                    const projectData = workspace.projects?.find(
                        (proj) => proj.id === Number(project)
                    );
                    if (projectData) {
                        setData({
                            name: projectData.name,
                            color: "#12b886",
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        if (project) {
            fetchProjectData();
        }
    }, [project, state]);
    return (
        <NewItemModal
            title="ویرایش پروژه جدید"
            button={Page === 3 ? "ویرایش پروژه جدید " : "ادامه"}
            handler={Page === 3 ? handleSubmitForm : handler}
            data={Data}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
            {Page === 1 && (
                <Inputs name="نام جدید پروژه" setData={setData} data={Data} />
            )}
            {Page === 2 && <ColorSelectionView setData={setData} data={Data} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </NewItemModal>
    );
};

export default EditProject;
