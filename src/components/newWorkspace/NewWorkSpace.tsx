import Inputs from "../common/newModal/Input";
import Modal from "../common/newModal/NewItemModal";
import { useState } from "react";
import SummaryView from "../common/newModal/SummaryView";
import ColorSelectionView from "../common/newModal/ColorSelectionView";

const NewWorkpace = ({
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
        <Modal
            title="ساخت ورک اسپیس جدید "
            button={Page === 3 ? "ساختن ورک اسپیس جدید " : "ادامه"}
            handler={handler}
            page={Page}
            prev={prev}
            handleClose={() => handleClose(false)}
        >
            {Page === 1 && <Inputs name="نام ورک اسپیس" setData={setData} />}
            {Page === 2 && <ColorSelectionView setData={setData} />}
            {Page === 3 && <SummaryView Data={Data} />}
        </Modal>
    );
};

export default NewWorkpace;
