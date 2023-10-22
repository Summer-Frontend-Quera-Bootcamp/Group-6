import { useState, useRef, useEffect } from "react";
import Card from "../Card";
import img from "@assets/images/workshop.jpg";
import * as Icon from "@assets/icons/icons";
import ModalSm from "@/components/common/ModalSm/index.tsx";
import useClickOutside from "@/hooks/useClickOutside.ts";
import { IGroup } from "@/pages/dashboard/colView";
//

interface GroupProps {
  group: IGroup;
}

// export const cardFakeData = [
//   {
//     id: 1,
//     listName: "پروژه اول",
//     description:
//       "این یک تیتر برای این تسک 1 است که طولانی شده است این برای تست کردن قابلیت lin-clamp است تا ببینیم آیا بعد از 2 خط ادامه متن محو میشود یا نه.",
//     imageUrl: img,
//     tags: ["درس", "پروژه"],
//     cardStatus: "open",
//   },
//   {
//     id: 2,
//     listName: "پروژه اول",
//     description: " این یک تیتر برای این تسک 2 است",
//     tags: ["کار"],
//     cardStatus: "in Progress",
//   },
//   {
//     id: 3,
//     listName: "پروژه اول",
//     description: " این یک تیتر برای این تسک 3 است",
//     cardStatus: "done",
//   },
//   {
//     id: 4,
//     listName: "پروژه اول",
//     description: " این یک تیتر برای این تسک 4 است",
//     cardStatus: "open",
//   },
//   {
//     id: 5,
//     listName: "پروژه اول",
//     description: " این یک تیتر برای این تسک 5 است",
//     cardStatus: "pending",
//   },
//   {
//     id: 6,
//     listName: "پروژه اول",
//     description: " این یک تیتر برای این تسک 6 است",
//     cardStatus: "todo",
//   },
// ];

const rows = [
  { icon: Icon.Edit, text: "ویرایش نام ستون" },
  { icon: Icon.Plus, text: "افزودن تسک" },
  { icon: Icon.Archive, text: "آرشیو تمام تسک‌ها" },
  { icon: Icon.Delete, text: "حذف ستون" },
];

const GroupColumn: React.FC<GroupProps> = ({ group }) => {
  const { name, isArchive, id, order, tasks, tasksCount, borderColor } = group;
  const [showOptions, setShowOptions] = useState(false);
  const handleOptions = (state: boolean) => {
    setShowOptions(state);
  };
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (state: boolean) => {
    setShowModal(state);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside([modalRef], () => {
    handleShowModal(false);
  });

  const [hovered, setHovered] = useState(false);
  const handleHovered = (state: boolean) => {
    setHovered(state);
  };

  // const filteredCards = cardFakeData.filter((card) => {
  //   return card.cardStatus === name;
  // });

  return (
    <div
      className={`flex flex-col mx-2`}
      onMouseEnter={() => handleHovered(true)}
      onMouseLeave={() => {
        handleHovered(false);
      }}
    >
      <div
        className={`w-[258px] flex items-center justify-between border-t-2 rounded-[16px] shadow-md shadow-gray-200  py-2 px-3 my-2 relative`}
        style={{ borderColor: "#ccc" }}
        onMouseEnter={() => handleOptions(true)}
        onMouseLeave={() => {
          handleOptions(false);
        }}
      >
        <div className="flex items-center gap-2">
          <h2>{name}</h2>
          <p className="text-xs bg-gray-badge p-1 rounded-lg">{tasksCount}</p>
        </div>
        {showOptions && (
          <div className="flex items-center animate-fadeIn">
            <img
              src={Icon.More}
              alt="more"
              onClick={() => {
                handleShowModal(true);
              }}
            />
            <img src={Icon.Plus} alt="add" />
          </div>
        )}
        {showModal && (
          <ModalSm rows={rows} ref={modalRef} className="top-11 left-0" />
        )}
      </div>

      {tasks.map((card) => (
        <Card key={card.id} data={card} />
      ))}

      {hovered && (
        <button className="border-2 border-brand-primary text-brand-primary text-sm font-extrabold rounded-lg flex items-center justify-center gap-2 py-1.5 m-2 animate-fadeIn">
          <img src={Icon.AddBrand} alt="Add icon" />
          ساختن تسک جدید
        </button>
      )}
    </div>
  );
};
export default GroupColumn;
