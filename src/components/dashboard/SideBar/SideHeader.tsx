import { Input } from "@/components/common";
import { Link } from "react-router-dom";
import * as Icon from "../../../assets/icons/icons";

import logo from "@assets/images/logo.svg";
const SideHeader: React.FC<{
    setShowSpaceModal?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowSpaceModal }) => {
    const handleNewSpace = () => {
        setShowSpaceModal && setShowSpaceModal(true);
    };
    return (
        <>
            <img src={logo} alt="logo" className="noFilter" />
            <Link
                to="/workspaces"
                className="flex items-center justify-between self-stretch"
            >
                <span>ورک‌اسپیس‌ها</span>
                <img src={Icon.Arrow} alt="arrow icon" />
            </Link>
            <div className="flex flex-col relative self-stretch items-start justify-center w-full">
                <img
                    src={Icon.Search}
                    alt="search icon"
                    className={`absolute z-50 text-[12px]`}
                />
                <Input
                    type="text"
                    placeholder="جستجو کنید"
                    classNames="w-full bg-gray-100 p-1 pr-9 relative w-[100%] rounded-[4px] text-[12px] border-none focus:outline-none"
                />
            </div>
            <button
                className="bg-[#D3D3D3] self-stretch p-1 rounded-[6px] flex items-center justify-center gap-1 noFilter text-black"
                onClick={handleNewSpace}
            >
                <img src={Icon.Add} alt="add icon" className="noFilter" />
                <span className="text-[12px]">ساختن اسپیس جدید</span>
            </button>
        </>
    );
};

export default SideHeader;
