import { FC, useState } from "react";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";

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
                    e.stopPropagation();
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

export { Dropdown };
