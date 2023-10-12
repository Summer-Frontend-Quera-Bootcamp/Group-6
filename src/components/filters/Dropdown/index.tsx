import { FC, useState } from "react";
import ArrowDownIcon from "../assets/icons/ArrowDownIcon";

export interface IItem {
    id: number;
    title: string;
}

interface IDropdownProps {
    list: Array<IItem>;
    onClick: (event: IItem) => void;
}

const Dropdown: FC<IDropdownProps> = ({ list, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IItem>();

    const handleSelect = (item: IItem) => {
        onClick?.(item);
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <div className="relative flex flex-col items-center max-w-[182px] w-[182px]">
            <button
                onClick={() => setIsOpen((prevState) => !prevState)}
                className="bg-white px-2 py-1 w-full flex items-center justify-between rounded-md border border-[#E9EBF0]"
            >
                {selectedItem?.title ?? "انتخاب کنید"}
                {/* {isOpen ? <div>close</div> : <div>open</div>} */}
                <ArrowDownIcon />
            </button>
            {isOpen ? (
                <div className="bg-white absolute top-10 flex flex-col item-start rounded-lg p-2 w-full z-50 shadow-lg">
                    {list.map((item) => (
                        <div
                            onClick={() => handleSelect(item)}
                            className="flex w-full justify-start py-[14px] cursor-pointer"
                            key={item.id}
                        >
                            <span className="font-bold">{item.title}</span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Dropdown;
