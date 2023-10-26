import { LinkWithQuery } from "@/components/common/LinkWithQuery";
import FilterModal from "@/components/filters/Filter";
import ShareModal from "@/components/shareModal";
import useClickOutside from "@/hooks/useClickOutside";
import calendar from "@assets/icons/Calendar.svg";
import Filter from "@assets/icons/Filter.svg";
import List from "@assets/icons/List.svg";
import Share from "@assets/icons/Share.svg";
import Column from "@assets/icons/column.svg";
import Search from "@assets/icons/search-loupe.svg";
import React, { useRef, useState } from "react";

interface OptionBarItemProps {
    active: boolean;
    setActive: (arg: boolean) => void;
    label: string;
    icon: string;
    link: string;
}
const OptionBarItem: React.FC<OptionBarItemProps> = ({
    active,
    setActive,
    label,
    icon,
    link,
}) => (
    <div
        className={`border-l-2  px-2 relative cursor-pointer ${
            active ? "text-brand-primary" : ""
        }`}
        onClick={() => setActive(true)}
    >
        <LinkWithQuery to={link} className="flex items-center gap-1">
            <img src={icon} alt={label} />
            <p className="font-bold">{label}</p>
        </LinkWithQuery>
        {active && (
            <hr className="absolute border-[1px] border-brand-primary w-[87%] top-[39px]" />
        )}
    </div>
);

const OptionBar: React.FC = ({}) => {
    const [showModal, setShowModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const filterModal = useRef(null);
    const filterText = useRef(null);

    const getActiveTab = () => {
        switch (location.pathname) {
            case "/dashboard/list":
                return 1;
            case "/dashboard/col":
                return 2;
            case "/dashboard/cal":
                return 3;
            default:
                return 2;
        }
    };

    const [activeTab, setActiveTab] = useState(getActiveTab());
    const handleShowModal = (state: boolean) => {
        setShowModal(state);
    };

    useClickOutside([filterModal, filterText], () => setShowFilters(false));
    return (
        <div>
            <div
                className="flex items-center self-stretch px-4 mt-[40px]"
                style={{ width: "calc(100vw - 300px)" }}
            >
                <span className="font-extrabold border-l-2 pl-2 text-[20px]">
                    پروژه اول
                </span>
                <OptionBarItem
                    active={activeTab === 1}
                    setActive={() => setActiveTab(1)}
                    label="نمایش لیستی"
                    icon={List}
                    link="/dashboard/list"
                />
                <OptionBarItem
                    active={activeTab === 2}
                    setActive={() => setActiveTab(2)}
                    label="نمایش ستونی"
                    icon={Column}
                    link="/dashboard/col"
                />
                <OptionBarItem
                    active={activeTab === 3}
                    setActive={() => setActiveTab(3)}
                    label="تقویم"
                    icon={calendar}
                    link="/dashboard/cal"
                />
                <div
                    className="flex items-center mr-auto px-2 cursor-pointer"
                    onClick={() => {
                        handleShowModal(true);
                    }}
                >
                    {showModal && (
                        <ShareModal
                            open={showModal}
                            setOpen={setShowModal}
                            title={"اشتراک گذاری ورک اسپیس"}
                            workspace={true}
                        />
                    )}
                    <img src={Share} alt="share icon" />
                    <span>اشتراک‌گذاری</span>
                </div>
            </div>
            <hr className="border-[1px] mx-4 my-3" />

            <div className="flex items-center self-stretch px-4 w-[100%]">
                <div className="self-stretch flex items-center">
                    <img
                        src={Search}
                        alt=""
                        className="relative right-[30px] z-50"
                    />
                    <input
                        type="text"
                        placeholder="جستجو کنید"
                        className="p-1 pr-9 relative w-[200px] text-[12px] border-l-2"
                    />
                </div>
                <div
                    className="pr-xl flex items-center gap-1"
                    onClick={() => setShowFilters((pervState) => !pervState)}
                    ref={filterText}
                >
                    <img src={Filter} alt="filter icon" />
                    <span className="font-bold text-[12px] cursor-pointer">
                        فیلترها
                    </span>
                </div>
                <div className="mx-6 bg-blue-100 px-2 py-0.5 rounded">
                    <span className="font-bold text-[12px] text-blue-primary">
                        دسته‌بندی‌شده با: وضعیت
                    </span>
                </div>
            </div>
            {showFilters && (
                <div
                    className="flex justify-center items-center  text-[#1E1E1E]"
                    dir="rtl"
                    ref={filterModal}
                >
                    <FilterModal closeModal={() => setShowFilters(false)} />
                </div>
            )}
            <hr className="border-[1px] mx-4 my-3" />
        </div>
    );
};
export default OptionBar;
