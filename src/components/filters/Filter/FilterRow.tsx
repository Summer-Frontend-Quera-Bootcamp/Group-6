import { FC, useState } from "react";
import Dropdown, { IItem } from "../Dropdown";
import { ITagTitle } from "../Tag";
import { IFilterData } from "@/context/FilterContext";
import DeleteIcon from "../assets/icons/DeleteIcon";

const whereList = [
  { id: 1, title: "تاریخ" },
  { id: 2, title: "تگ" },
  { id: 3, title: "اعضا" },
  { id: 4, title: "اولویت" },
];

const tagList: { id: number; title: ITagTitle }[] = [
  { id: 1, title: "درس" },
  { id: 2, title: "پروژه" },
  { id: 3, title: "کار" },
];

const statusList = [
  { id: 1, title: "است" },
  { id: 2, title: "نیست" },
];

interface IFilterRowProps {
  filterData: IFilterData;
  onUpdate: (item: IFilterData) => void;
  onDelete: (id: number) => void;
}

const FilterRow: FC<IFilterRowProps> = ({ filterData, onUpdate, onDelete }) => {
  const [rowData, setRowData] = useState<IFilterData>(filterData);

  const handleUpdate = (item: IItem, which: "where" | "tag" | "isOrNot") => {
    const updatedRowData = { ...rowData };
    updatedRowData[which] = item.title;
    setRowData(updatedRowData);

    onUpdate(updatedRowData);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start items-center gap-2.5">
        <span>تسک‌هایی که</span>
        <Dropdown
          list={whereList}
          onClick={(item) => handleUpdate(item, "where")}
          defaultValue={filterData.where}
        />
        <span>آن‌ها</span>
        <Dropdown
          list={tagList}
          onClick={(item) => handleUpdate(item, "tag")}
          defaultValue={filterData.tag}
        />
        <Dropdown
          list={statusList}
          onClick={(item) => handleUpdate(item, "isOrNot")}
          defaultValue={filterData.isOrNot}
        />
      </div>
      <button onClick={() => onDelete(filterData.id)}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default FilterRow;
