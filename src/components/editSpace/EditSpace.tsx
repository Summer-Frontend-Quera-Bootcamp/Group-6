import { AppContext } from "@/context/store";
import useQueryParams from "@/utils/useQueryParams";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ColorSelectionView from "../common/newModal/ColorSelectionView";
import Inputs from "../common/newModal/Input";
import NewItemModal from "../common/newModal/NewItemModal";
import SummaryView from "../common/newModal/SummaryView";
import { useEditSpace } from "@/services/Workspaces/mutations/useEditSpace";

const EditSpace = ({
    handleClose,
    page = 1,
}: {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    page?: number;
}) => {
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState<{ name: string; color?: string }>({
        name: "",
        color: "",
    });
    const { space } = useQueryParams();
    const { state } = useContext(AppContext);
    let handler = () => {
        if (Page !== 3) {
            setPage((page) => page + 1);
        }
    };

    let prev = () => {
        setPage((page) => page - 1);
    };

    const spaceMutation = useEditSpace();
    const handleSubmitForm = () => {
        const creds = {
            space_id: Number(space),
            name: Data.name,
            color: Data.color,
        };
        spaceMutation.mutate(creds, {
            onSuccess: () => {
                try {
                    toast.success("ورک اسپیس ویرایش شد");
                    handleClose(false);
                    location.reload();
                } catch (error) {
                    toast.error("هنگام ویرایش ورک اسپیس مشکلی پیش آمده");
                    console.error(error);
                }
            },
            onError: (e) => {
                toast.error("هنگام ساخت ورک اسپیس مشکلی پیش آمده");
                console.error(e);
            },
        });
    };

    useEffect(() => {
        const fetchSpaceData = async () => {
            try {
                const workspace = state.user.workspaces.find(
                    (ws) => ws.id === Number(space)
                );
                if (workspace) {
                    setData({
                        name: workspace.name,
                        color: workspace.color,
                    });
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        if (space) {
            fetchSpaceData();
            setPage(page);
        }
    }, [space]);

    return (
        <NewItemModal
            title="ویرایش ورک اسپیس جدید"
            button={Page === 3 ? "ویرایش ورک اسپیس جدید " : "ادامه"}
            handler={Page === 3 ? handleSubmitForm : handler}
            data={Data}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
            {Page === 1 && (
                <Inputs
                    name="نام جدید ورک اسپیس"
                    setData={setData}
                    data={Data}
                />
            )}
            {Page === 2 && <ColorSelectionView setData={setData} data={Data} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </NewItemModal>
    );
};

export default EditSpace;
