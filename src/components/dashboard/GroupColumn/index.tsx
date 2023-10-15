import { useState, useRef } from "react";
import Card from "../Card";
import img from "@assets/images/workshop.jpg";
import * as Icon from "@assets/icons/icons.ts";
import ModalSm from "@/components/common/ModalSm/index.tsx";
import useClickOutside from "@/hooks/useClickOutside.ts";

interface GroupProps {
  group: {
    title: string;
    borderColor: string;
    status: string;
  };
}

const cardFakeData = [
  {
    id: 1,
    listName: "پروژه اول",
    description:
      "این یک تیتر برای این تسک 1 است که طولانی شده است این برای تست کردن قابلیت lin-clamp است تا ببینیم آیا بعد از 2 خط ادامه متن محو میشود یا نه.",
    imageUrl: img,
    tags: ["درس", "پروژه"],
    cardStatus: "open",
  },
  {
    id: 2,
    listName: "پروژه اول",
    description: " این یک تیتر برای این تسک 2 است",
    tags: ["کار"],
    cardStatus: "in Progress",
  },
  {
    id: 3,
    listName: "پروژه اول",
    description: " این یک تیتر برای این تسک 3 است",
    cardStatus: "done",
  },
  {
    id: 4,
    listName: "پروژه اول",
    description: " این یک تیتر برای این تسک 4 است",
    cardStatus: "open",
  },
  {
    id: 5,
    listName: "پروژه اول",
    description: " این یک تیتر برای این تسک 5 است",
    cardStatus: "pending",
  },
  {
    id: 6,
    listName: "پروژه اول",
    description: " این یک تیتر برای این تسک 6 است",
    cardStatus: "todo",
  },
];

const rows = [
  { icon: Icon.Edit, text: "ویرایش نام ستون" },
  { icon: Icon.Plus, text: "افزودن تسک" },
  { icon: Icon.Archive, text: "آرشیو تمام تسک‌ها" },
  { icon: Icon.Delete, text: "حذف ستون" },
];

const GroupColumn: React.FC<GroupProps> = ({ group }) => {
  const { title, borderColor, status } = group;
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

  const filteredCards = cardFakeData.filter((card) => {
    console.log(status);
    return card.cardStatus === status;
  });
  console.log(filteredCards);

  return (
    <div className={`flex flex-col mx-2`}>
      <div
        className={`w-[258px] flex items-center justify-between border-t-2 rounded-[16px] shadow-md shadow-gray-200  py-2 px-3 my-2 relative`}
        style={{ borderColor: borderColor }}
        onMouseEnter={() => handleOptions(true)}
        onMouseLeave={() => {
          handleOptions(false);
        }}
      >
        <div className="flex items-center gap-2">
          <h2>{title}</h2>
          <p className="text-xs bg-gray-badge p-1 rounded-lg">
            {filteredCards.length}
          </p>
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

      {filteredCards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
};
export default GroupColumn;
