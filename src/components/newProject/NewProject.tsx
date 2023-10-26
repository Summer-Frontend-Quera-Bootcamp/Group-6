import { useState } from "react";
import Inputs from "../common/newModal/Input";
import ColorSelectionView from "../common/newModal/ColorSelectionView";
import SummaryView from "../common/newModal/SummaryView";
import NewItemModal from "../common/newModal/NewItemModal";

const NewProject = ({
    handleClose,
}: {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [Page, setPage] = useState(1);
    const [Data, setData] = useState({ name: "", color: "" });

    let handler = () => {
        if (Page !== 3) {
            setPage((page) => page + 1);
        }
    };

    let prev = () => {
        setPage((page) => page - 1);
    };

    return (
        <NewItemModal
            title="ساخت پروژه جدید"
            button={Page === 3 ? "ساختن پروژه جدید " : "ادامه"}
            handler={handler}
            data={Data}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
            {Page === 1 && (
                <Inputs name="نام پروژه جدید" setData={setData} data={Data} />
            )}
            {Page === 2 && <ColorSelectionView setData={setData} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </NewItemModal>
    );
};

export default NewProject;
