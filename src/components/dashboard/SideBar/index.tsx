import React from "react";
import { useState } from "react";
import logo from "@assets/images/logo.svg";
import { ToggleTheme } from "@components/common";
import * as Icon from "../../../assets/icons/icons";

const spaces = [
  {
    name: "درس مدیریت پروژه",
    color: "#40C057",
    subs: [],
  },
  {
    name: "کارهای شخصی",
    color: "#FAB005",
    subs: [
      { id: 1, name: "پروژه اول" },
      { id: 2, name: "پروژه دوم" },
      { id: 3, name: "پروژه سوم" },
    ],
  },
  {
    name: "درس کامپایلر",
    color: "#FA5252",
    subs: [],
  },
  {
    name: "درس طراحی الگوریتم",
    color: "#228BE6",
    subs: [],
  },
];

interface IProjectItem {
  isActive?: boolean;
  name?: string;
  id?: number;
  selectedItem?: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

// isAcrivw is for when I want to
interface ISpaceItem {
  isActive?: boolean;
  name?: string;
  id?: number;
  color?: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<number>>;
}

const SpaceProject: React.FC<IProjectItem> = ({
  selectedItem,
  setSelectedItem,
  name,
  id,
}) => {
  return (
    <li
      className={`mr-[28px] mb-4  cursor-pointer p-[6px] ${
        selectedItem === id ? " rounded-[4px] bg-cyan-100" : ""
      }`}
      onClick={() => setSelectedItem(id)}
    >
      {name}
    </li>
  );
};

const SpaceItem: React.FC<ISpaceItem> = ({ isActive, name, id, color }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <span
        className="w-[20px] h-[20px] inline-block rounded-[4px]"
        style={{ backgroundColor: color }}
      ></span>
      <span>{name}</span>
    </div>
  );
};

const SideBar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | undefined>(1);
  return (
    <div className="flex flex-col items-start justify-between pr-[50px] pl-4 pt-[40px] border-l-2 w-[340px] min-w-[300px] h-[100vh] bg-inherit">
      <div className="flex flex-col gap-s">
        <img src={logo} alt="logo" />
        {/* workspaces accordion */}
        <div className="flex items-center justify-between self-stretch">
          <span>ورک‌اسپیس‌ها</span>
          <img src={Icon.Arrow} alt="arrow icon" />
        </div>
        {/* search input  */}
        <div className="relative self-stretch">
          <img
            src={Icon.Search}
            alt="search icon"
            className="absolute top-1 right-1 z-50 text-[12px]"
          />
          <input
            type="text"
            placeholder="جستجو کنید"
            className="bg-gray-100 p-1 pr-9 relative w-[100%] rounded-[4px] text-[12px]"
          />
        </div>
        {/* add new space btn */}
        <button className="bg-[#D3D3D3] self-stretch p-1 rounded-[6px] flex items-center justify-center gap-1">
          <img src={Icon.Add} alt="add icon" />
          <span className="text-[12px]">ساختن اسپیس جدید</span>
        </button>
        {/* spaces names */}
        {/* <div className="flex items-center gap-2 cursor-pointer">
          <span className="w-[20px] h-[20px] inline-block rounded-[4px] bg-green-500"></span>
          <span>درس مدیریت پروژه</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="w-[20px] h-[20px] inline-block rounded-[4px] bg-orange-500"></span>
          <span>کارهای شخص</span>
        </div> */}
        {/* project names */}

        {spaces.map((space) => (
          <>
            <SpaceItem name={space.name} color={space.color} />
            <ul className="self-stretch">
              {space.subs.map((sub) => (
                <SpaceProject
                  name={sub.name}
                  id={sub.id}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </ul>
          </>
        ))}
        <button className="self-stretch p-1 rounded-[8px] border-2 border-brand-primary">
          <span className="text-brand-primary text-sm">ساختن پروژه جدید</span>
        </button>
      </div>
      {/* bottom container */}
      <div className="pb-[40px] self-stretch">
        <div className="flex gap-3 items-center mb-6">
          <div className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-blue-300 text-blue-700">
            NM
          </div>
          <span>نیلوفر موجودی</span>
        </div>
        <div className="flex items-center justify-between pl-[20px]">
          <span className="flex items-center gap-1 cursor-pointer">
            <img src={Icon.Exit} alt="exit icon" />
            <span className="text-gray-400">خروج</span>
          </span>
          <span style={{ direction: "ltr" }}>
            <ToggleTheme />
          </span>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
