import { useContext, useState } from "react";
import Inputs from "../common/newModal/Input";
import ColorSelectionView from "../common/newModal/ColorSelectionView";
import SummaryView from "../common/newModal/SummaryView";
import NewItemModal from "../common/newModal/NewItemModal";
import { UseProjectTheme } from "@/services/Projects/mutations/useProjectMutation";
import useQueryParams from "@/utils/useQueryParams";
import { IProjectData } from "@/types/api.types";
import { toast } from "react-toastify";
import { AppContext } from "@/context/store";
import { UpdateWorkspaces } from "@/context/user/user.action";
import { useCreateDefaultBoards } from "@/services/boards/mutations/useCreateDefaultBoards";

const NewProject = ({
    handleClose,
}: {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState({ name: "", color: "" });
    const { space } = useQueryParams();
    const { dispatch } = useContext(AppContext);
    let handler = () => {
        if (Page !== 3) {
            setPage((page) => page + 1);
        }
    };

    let prev = () => {
        setPage((page) => page - 1);
    };

   const projectMutation = UseProjectTheme();
    const boardsMutation = useCreateDefaultBoards();
    const handleSubmitForm = () => {
        const creds: IProjectData = {
            space_id: Number(space),
            name: Data.name,
        };
        projectMutation.mutate(creds, {
            onSuccess: async (e) => {
                try {
                    boardsMutation.mutateAsync({
                        space_id: space,
                        project_id: e.id,
                    });
                    dispatch(UpdateWorkspaces());
                    toast.success("پروژه ساخته شد");
                    handleClose(false);
                } catch (error) {
                    toast.error("هنگام ساخت پروژه مشکلی پیش آمده");
                    console.error(error);
                }
            },
            onError: (e) => {
                toast.error("هنگام ساخت پروژه مشکلی پیش آمده");
                console.error(e);
            },
        });
    };
    return (
        <NewItemModal
            title="ساخت پروژه جدید"
            button={Page === 3 ? "ساختن پروژه جدید " : "ادامه"}
            handler={Page === 3 ? handleSubmitForm : handler}
            data={Data}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
            {Page === 1 && (
                <Inputs name="نام پروژه جدید" setData={setData} data={Data} />
            )}
            {Page === 2 && <ColorSelectionView setData={setData} data={Data} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </NewItemModal>
    );
};

export default NewProject;
