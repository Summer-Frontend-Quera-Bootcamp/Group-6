import { CloseIcon } from "@/assets/pages/newTask";
import CheckBox from "@/components/common/CheckBox";
import { IHeaderProps } from "@/types/newTask.types";

const Header: React.FC<IHeaderProps> = ({ taskName, closeModal }) => (
    <div className="flex justify-between items-center self-stretch">
        <img
            src={CloseIcon}
            alt="close"
            className="cursor-pointer"
            onClick={() => closeModal(false)}
        />
        <div className="flex items-center gap-[13px]">
            <input
                className="outline-none bg-transparent text-right text-body-xl font-[500] rtl"
                placeholder={taskName}
            />
            <CheckBox />
        </div>
    </div>
);

export { Header };
