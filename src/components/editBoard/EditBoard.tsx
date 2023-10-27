import { IBoardData } from "@/types/api.types";
import useQueryParams from "@/utils/useQueryParams";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ColorSelectionView from "../common/newModal/ColorSelectionView";
import Inputs from "../common/newModal/Input";
import NewItemModal from "../common/newModal/NewItemModal";
import SummaryView from "../common/newModal/SummaryView";
import { fetchBoard } from "@/services/boards";
import { useEditBoards } from "@/services/boards/mutations/useEditBoards";

const EditBoard = ({
    handleClose,
}: {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState({ name: "", color: "" });
    const { space, project, board } = useQueryParams();
    let handler = () => {
        if (Page !== 3) {
            setPage((page) => page + 1);
        }
    };

    let prev = () => {
        setPage((page) => page - 1);
    };

    const boardsMutation = useEditBoards();
    const handleSubmitForm = () => {
        const creds: IBoardData = {
            space_id: space,
            project_id: project,
            board_id: board,
            name: Data.name,
            is_archive: false,
            color: Data.color,
        };

        boardsMutation.mutate(creds, {
            onSuccess: () => {
                try {
                    toast.success("بورد ویرایش شد");
                    handleClose(false);
                    location.reload();
                } catch (error) {
                    toast.error("هنگام ویرایش بورد مشکلی پیش آمده");
                    console.error(error);
                }
            },
            onError: (e) => {
                toast.error("هنگام ویرایش بورد مشکلی پیش آمده");
                console.error(e);
            },
        });
    };

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardData = await fetchBoard(space, project, board);
                if (boardData) {
                    setData({
                        name: boardData.name,
                        color: boardData.color,
                    });
                }
            } catch (error) {
                console.error("Error fetching board data:", error);
            }
        };

        if (board) {
            fetchBoardData();
        }
    }, [board]);

    return (
        <NewItemModal
            title="ویرایش بورد جدید"
            button={Page === 3 ? "ویرایش بورد جدید " : "ادامه"}
            handler={Page === 3 ? handleSubmitForm : handler}
            data={Data}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
            {Page === 1 && (
                <Inputs name="نام جدید بورد" setData={setData} data={Data} />
            )}
            {Page === 2 && <ColorSelectionView setData={setData} data={Data} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </NewItemModal>
    );
};

export default EditBoard;
