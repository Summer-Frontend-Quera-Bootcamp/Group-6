import React, { useState, useRef } from "react";
import "@assets/styles/global.css";
// import Icon from "react-multi-date-picker/components/icon";
import * as Icon from "../../../assets/icons/icons";
import ModalSm from "@/components/common/ModalSm/index.tsx";
import useClickOutside from "@/hooks/useClickOutside";

interface CardProps {
  data: {
    listName: string;
    description: string;
    imageUrl?: string;
    profile?: string;
    tags?: string[];
    cardStatus: string;
  };
}

const rows = [
  { icon: Icon.Edit, text: "ویرایش تسک" },
  { icon: Icon.Plus, text: "افزودن subtask" },
  { icon: Icon.Archive, text: "آرشیو تسک" },
  { icon: Icon.Delete, text: "حذف تسک" },
];

const Card: React.FC<CardProps> = ({ data }) => {
  const { listName, description, imageUrl, profile, tags } = data;
  const [hovered, setHovered] = useState(false);
  //   const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("open");

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (state: boolean) => {
    setShowModal(state);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside([modalRef], () => {
    handleShowModal(false);
  });

  const handleHover = (state: boolean) => {
    setHovered(state);
  };

  // const handleModalOpen = () => {
  //     setModalOpen(true);
  // };

  // const handleModalClose = () => {
  //     setModalOpen(false);
  // };

  //   const handleModal = (state: boolean) => {
  //     setModalOpen(state);
  //   };

  const handleStatusChange = () => {
    setStatus("done");
    console.log("status changed to done");
  };

  return (
    <div
      className={`card rounded-[16px] border-b-gray-300 shadow-md shadow-gray-400 border-b-4 w-[250px] my-2 mx-1 p-s border relative`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => {
        handleHover(false);
      }}
    >
      <img
        src={imageUrl}
        alt="task attachment"
        className={`${!imageUrl ? "hidden" : ""} mb-s`}
      />
      <div className="flex items-center justify-between text-[12px] text-[#534D60] mb-s">
        <h3>{listName}</h3>
        <span>{profile && <img src={profile} alt="profile" />}</span>
      </div>
      <div className="flex items-start gap-2 mb-s">
        <p className="text-[12px] line-clamp-2">{description}</p>
        <img src={Icon.Description} alt="icon" />
      </div>
      <div className="flex items-center gap-1 text-[12px] mb-s">
        {/* <span>img</span> */}
        <span>۵ مهر - فردا</span>
        {/* <span>img</span> */}
        <span>۲ / ۱۲</span>
      </div>
      <div className="flex items-center gap-1">
        {tags?.map((tag) => (
          <span className="text-[12px] bg-grape-secondary text-grape-primary py-0.5 px-2 rounded-xl">
            {tag}
          </span>
        ))}
      </div>
      <div
        className={`icons items-center justify-between border-t-2 mt-s p-2  ${
          hovered ? "flex animate-fadeIn" : "hidden"
        } hover`}
      >
        <img
          src={Icon.Tick}
          alt="done"
          className="cursor-pointer"
          onClick={handleStatusChange}
        />
        <img
          src={Icon.More}
          alt="menu icon"
          className="cursor-pointer"
          onClick={() => {
            handleShowModal(true);
          }}
        />
      </div>
      {showModal && (
        <ModalSm rows={rows} ref={modalRef} className="bottom-2 left-2" />
      )}
    </div>
  );
};

export default Card;
