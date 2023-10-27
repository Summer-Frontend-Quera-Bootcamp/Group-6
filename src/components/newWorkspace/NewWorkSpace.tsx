import Inputs from "../common/newModal/Input";
import { useContext, useState } from "react";
import SummaryView from "../common/newModal/SummaryView";
import ColorSelectionView from "../common/newModal/ColorSelectionView";
import { UseWorkSpaceMutation } from "@/services/Workspaces/mutations/UseWorkSpaceMutation";
import { IWorkspaceData } from "@/types/api.types";
import { AppContext } from "@/context/store";
import { UpdateWorkspaces } from "@/context/user/user.action";
import { toast } from "react-toastify";
import NewItemModal from "../common/newModal/NewItemModal";

const NewWorkSpace = ({
    handleClose,
}: {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState({ name: "", color: "" });
   const { dispatch } = useContext(AppContext);

    let handler = () => {
        if (Page !== 3) {
            setPage((page) => page + 1);
        }
    };

    let prev = () => {
        setPage((page) => page - 1);
    };

  const workspaceMutation = UseWorkSpaceMutation();
    const handleSubmitForm = () => {
        const creds: IWorkspaceData = {
            name: Data.name,
            color: Data.color,
        };
        workspaceMutation.mutate(creds, {
            onSuccess: (e) => {
                dispatch(UpdateWorkspaces());
                toast.success("ورک اسپیس ساخته شد");
                console.log(e);
                handleClose(false);
            },
            onError: (e) => {
                toast.error("هنگام ساخت پروژه مشکلی پیش آمده");
                console.error(e);
            },
        });
    };

    return (
        <NewItemModal
            title="ساخت ورک اسپیس جدید "
            button={Page === 3 ? "ساختن ورک اسپیس جدید " : "ادامه"}
            handler={Page === 3 ? handleSubmitForm : handler}
            data={Data}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
    {Page === 1 && (
                <Inputs name="نام ورک اسپیس" setData={setData} data={Data} />
            )}
            {Page === 2 && <ColorSelectionView setData={setData} data={Data} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </NewItemModal>
    );
};

export default NewWorkSpace;
