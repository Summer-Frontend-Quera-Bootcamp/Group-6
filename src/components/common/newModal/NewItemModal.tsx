import CloseIcon from "@assets/icons/close.svg";
import BackIcon from "@assets/icons/group.svg";
import { SubmitBtn } from "..";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext";

const NewItemModal = (props: any) => {
    const handleSubmit = () => {
        if (props.data.name !== "") {
            toast.dismiss();
            props.handler();
        } else {
            toast.error("لطفا نام ورک اسپیس را وارد کنید");
        }
    };
    const { theme } = useTheme();
    return (
        <div
            className={`modal shadow-newTask rounded-[8px] bg-inherit flex items-center justify-center z-[999]`}
            dir="ltr"
        >
            <div
                className={`flex flex-col mainDiv p-7 items-center gap-10 rounded-lg bg-white ${theme}`}
            >
                <div className="flex flex-col items-center gap-10">
                    <div className="flex items-center justify-between titleDiv">
                        {props.page !== 1 && (
                            <img
                                src={BackIcon}
                                alt="icons"
                                onClick={props.prev}
                                className="text-black cursor-pointer"
                            />
                        )}
                        <h1 className="text-2xl m-auto">{props.title}</h1>
                        <img
                            src={CloseIcon}
                            alt="icons"
                            className="text-black cursor-pointer"
                            onClick={props.handleClose}
                        />
                    </div>
                    {props.children}
                </div>
                <SubmitBtn
                    className="text-white text-right flex text-sm myWidth justify-center items-center p-2.5 h-10 gap-2.5 rounded-md font-extrabold"
                    value={props.button}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default NewItemModal;
