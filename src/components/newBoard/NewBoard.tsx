import { useCreateBoards } from "@/services/boards/mutations/useCreateBoards";
import { IBoardData } from "@/types/api.types";
import useQueryParams from "@/utils/useQueryParams";
import { useState } from "react";
import { toast } from "react-toastify";
import ColorSelectionView from "../common/newModal/ColorSelectionView";
import Inputs from "../common/newModal/Input";
import NewItemModal from "../common/newModal/NewItemModal";
import SummaryView from "../common/newModal/SummaryView";

const NewBoard = ({
    handleClose,
}: {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState({ name: "", color: "" });
    const { space, project } = useQueryParams();
    let handler = () => {
        if (Page !== 3) {
            setPage((page) => page + 1);
        }
    };

    let prev = () => {
        setPage((page) => page - 1);
    };

    const boardsMutation = useCreateBoards();
    const handleSubmitForm = () => {
        const creds: IBoardData = {
            space_id: space,
            project_id: project,
            name: Data.name,
            is_archive: false,
            color: Data.color,
        };
        boardsMutation.mutate(creds, {
            onSuccess: () => {
                try {
                    toast.success("بورد ساخته شد");
                    handleClose(false);
                    location.reload();
                } catch (error) {
                    toast.error("هنگام ساخت بورد مشکلی پیش آمده");
                    console.error(error);
                }
            },
            onError: (e) => {
                toast.error("هنگام ساخت بورد مشکلی پیش آمده");
                console.error(e);
            },
        });
    };
    return (
        <NewItemModal
            title="ساخت بورد جدید"
            button={Page === 3 ? "ساختن بورد جدید " : "ادامه"}
            handler={Page === 3 ? handleSubmitForm : handler}
            data={Data}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
            {Page === 1 && (
                <Inputs name="نام بورد جدید" setData={setData} data={Data} />
            )}
            {Page === 2 && <ColorSelectionView setData={setData} data={Data} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </NewItemModal>
    );
};

export default NewBoard;
