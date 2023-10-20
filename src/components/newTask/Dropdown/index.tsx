import { FC, useContext, useState } from "react";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import { IProjects } from "@/context/types/context.type";
import { useEffect } from "react";
import { AppContext } from "@/context/store";

interface IDropdownProps {
    list: any[] | undefined;
    onClick: any;
}

const Dropdown: FC<IDropdownProps> = ({ list, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(list?.[0]);

    const handleSelect = (item: any) => {
        setSelectedItem(item);
        setIsOpen(false);
        onClick(item);
    };

    return (
        <div
            className="relative flex flex-col items-center max-w-[182px] w-[182px]"
            dir="rtl"
        >
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    setIsOpen((prevState) => !prevState);
                }}
                className="bg-white px-2 py-1 w-full flex items-center justify-between rounded-md border border-[#E9EBF0]"
            >
                {selectedItem?.name ?? "انتخاب کنید"}
                <ArrowDownIcon />
            </button>

            {isOpen ? (
                <div className="bg-white absolute top-10 flex flex-col item-start rounded-lg p-2 w-full z-50 shadow-lg">
                    {list ? (
                        list.map((item) => (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(item);
                                }}
                                className="flex w-full justify-start py-[14px] cursor-pointer"
                                key={item.id}
                            >
                                <span className="font-bold">{item.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className="flex w-full justify-start py-[14px]cursor-pointer">
                            <span className="font-bold text-black">
                                پروژه ای یافت نشد
                            </span>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

const DropdownSelect: React.FC<IDropdownProps> = ({ list, onClick }) => {
    const [selectedProject, setSelectedProject] = useState<any>();

    const handleProjectChange = (event: any) => {
        const selectedId: number = Number(event.target.value);
        const project = list?.find((p) => p?.id === selectedId);

        setSelectedProject(project);
        onClick(project);
    };

    return (
        <div className="relative">
            <select
                id="projectDropdown"
                value={selectedProject?.id} // Set the value to the selected project's ID
                onChange={onClick}
                className="flex w-[158px] py-[4px] px-xs justify-end items-center gap-[10px] rounded-[6px] border-[1px] border-[#E9EBF0] text-body-m"
                dir="rtl"
            >
                {list?.map((project) => (
                    <option
                        key={project?.id}
                        value={project?.id}
                        className="outline-none border-none"
                    >
                        {project?.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { Dropdown, DropdownSelect };
