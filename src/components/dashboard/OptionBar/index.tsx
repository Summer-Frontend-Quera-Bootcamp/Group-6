import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@assets/icons/List.svg";
import ListActive from "@assets/icons/List-Active.svg";
import Column from "@assets/icons/column.svg";
import ColumnActive from "@assets/icons/column-Active.svg";
import calendar from "@assets/icons/Calendar.svg";
import calendaractive from "@assets/icons/Calendar-Active.svg";
import Share from "@assets/icons/Share.svg";
import Search from "@assets/icons/search-loupe.svg";
import Filter from "@assets/icons/Filter.svg";
import FilterModal from "@/components/filters/Filter";

interface IOptionProps {
    openModals: () => void;
}

const OptionBar: React.FC<IOptionProps> = ({ openModals }) => {
    let selected;

    //TODO add path to find selected tab
    // const path = useLocation().pathname;
    const [active, setActive] = useState(2);
    const handleActive = (idx: number) => {
        setActive(idx);
    };
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div>
            <div
                className="flex items-center self-stretch px-4 mt-[40px]"
                style={{ width: "calc(100vw - 300px)" }}
            >
                <span className="font-extrabold border-l-2 pl-2 text-[20px]">
                    پروژه اول
                </span>
                <div
                    className={`border-l-2  px-2 relative cursor-pointer ${
                        selected === 1 ? "text-brand-primary" : ""
                    }${active === 1 ? "text-brand-primary" : ""}`}
                    onClick={() => {
                        handleActive(1);
                    }}
                >
                    <Link
                        to="/dashboard/list"
                        className="flex items-center gap-1"
                    >
                        <img
                            src={active === 1 ? ListActive : List}
                            alt="list view"
                        />
                        <p className="font-bold">نمایش لیستی</p>
                    </Link>
                    {active === 1 && (
                        <hr className="absolute border-[1px] border-brand-primary w-[87%] top-[39px]" />
                    )}
                </div>
                <div
                    className={`border-l-2  px-2 relative cursor-pointer ${
                        selected === 2 ? "text-brand-primary" : ""
                    }${active === 2 ? "text-brand-primary" : ""}`}
                    onClick={() => {
                        handleActive(2);
                    }}
                >
                    <Link
                        to="/dashboard/col"
                        className="flex items-center gap-1"
                    >
                        <img
                            src={active === 2 ? ColumnActive : Column}
                            alt="column view"
                        />
                        <p className="font-bold">نمایش ستونی</p>
                    </Link>
                    {active === 2 && (
                        <hr className="absolute border-[1px] border-brand-primary w-[87%] top-[39px]" />
                    )}
                </div>
                <div
                    className={`border-l-2  px-2 relative cursor-pointer ${
                        selected === 3 ? "text-brand-primary" : ""
                    }${active === 3 ? "text-brand-primary" : ""}`}
                    onClick={() => {
                        handleActive(3);
                    }}
                >
                    <Link
                        to="/dashboard/cal"
                        className="flex items-center gap-1"
                    >
                        <img
                            src={active === 3 ? calendaractive : calendar}
                            alt="calendar view"
                        />
                        <p className="font-bold">تقویم</p>
                    </Link>
                    {active === 3 && (
                        <hr className="absolute border-[1px] border-brand-primary w-[87%] top-[39px]" />
                    )}
                </div>
                <div
                    className="flex items-center mr-auto px-2 cursor-pointer"
                    onClick={openModals}
                >
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
                    onClick={() => setShowFilters(true)}
                >
                    <img src={Filter} alt="filter icon" />
                    <span className="font-bold text-[12px] ">فیلترها</span>
                </div>
                <div className="mx-6 bg-blue-100 px-2 py-0.5 rounded">
                    <span className="font-bold text-[12px] text-blue-primary">
                        دسته‌بندی‌شده با: وضعیت
                    </span>
                </div>{" "}
            </div>
            {showFilters && (
                <div
                    className="flex justify-center items-center  text-[#1E1E1E] "
                    dir="rtl"
                >
                    <FilterModal closeModal={() => setShowFilters(false)} />
                </div>
            )}
            <hr className="border-[1px] mx-4 my-3" />
        </div>
    );
};
export default OptionBar;
