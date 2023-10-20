import { CloseIcon } from "@/assets/pages/newTask";
import CheckBox from "@/components/common/CheckBox";
import { IHeaderProps } from "@/types/newTask.types";

const Header: React.FC<IHeaderProps> = ({ closeModal, children }) => (
    <div className="flex justify-between items-center self-stretch">
        <img
            src={CloseIcon}
            alt="close"
            className="cursor-pointer"
            onClick={() => closeModal(false)}
        />
        <div className="flex items-center gap-[13px]">
            {children}
            <CheckBox />
        </div>
    </div>
);

export { Header };
