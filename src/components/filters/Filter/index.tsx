import { useState } from "react";
import FilterRow from "./FilterRow";
import CloseIcon from "@assets/icons/close.svg";

export interface IFilterData {
    id: number;
    isOrNot: string;
    tag: string;
    where: string;
}

interface IFilterModalProps {
    closeModal: () => void;
}
const FilterModal: React.FC<IFilterModalProps> = ({ closeModal }) => {
    const [filters, setFilters] = useState<Array<IFilterData>>([]);

    const addRow = () => {
        const newRow: IFilterData = {
            id: filters.length + 1,
            isOrNot: "",
            tag: "",
            where: "",
        };
        filters.push(newRow);
        setFilters([...filters]);
    };

    const handleDelete = (id: number) => {
        const index = filters.findIndex((filter) => filter.id === id);
        filters.splice(index, 1);
        setFilters([...filters]);
    };

    const handleUpdate = (item: IFilterData) => {
        const index = filters.findIndex((filter) => filter.id === item.id);
        filters[index] = item;
        setFilters([...filters]);
    };

    return (
        <div className="bg-white py-4 px-5 border border-red-50 rounded-lg min-h-[206px] shadow-newTask w-fit min-w-[720px] absolute top-36 right-[550px]">
            <div className="flex justify-between items-center mb-3.5">
                <h3 className="text-2xl font-black">فیلتر‌ها</h3>
                <button onClick={closeModal}>
                    <img src={CloseIcon} alt="close" />
                </button>
            </div>
            {filters.map((filter) => (
                <div
                    key={filter.id}
                    className="flex flex-col justify-center mb-4"
                >
                    <FilterRow
                        filterData={filter}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                </div>
            ))}
            <button
                onClick={addRow}
                className="font-black text-xs text-[#208D8E]"
            >
                افزودن فیلتر جدید
            </button>
        </div>
    );
};

export default FilterModal;
