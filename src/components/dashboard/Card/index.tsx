import React, { useState } from "react";
import More from "@assets/icons/More.svg";
import Tick from "@assets/icons/Tick.svg";
import "@assets/styles/global.css";

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

const Card: React.FC<CardProps> = ({ data }) => {
    const { listName, description, imageUrl, profile, tags } = data;
    const [hovered, setHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("open");

    const handleHover = (state: boolean) => {
        setHovered(state);
    };

    // const handleModalOpen = () => {
    //     setModalOpen(true);
    // };

    // const handleModalClose = () => {
    //     setModalOpen(false);
    // };

    const handleModal = (state: boolean) => {
        setModalOpen(state);
    };

    const handleStatusChange = () => {
        status === "open" ? setStatus("completed") : setStatus("open");
    };

    return (
        <div
            className={`card rounded-[16px] border-b-gray-300 shadow-md shadow-gray-400 border-b-4 w-[250px] my-2 mx-1 p-s border
      ${hovered ? "anim" : ""}}`}
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
            <div className="flex items-center gap-2 mb-s">
                <p className="text-[12px]">{description}</p>
                {/* <span>img</span> */}
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
                className={`icons items-center justify-between border-t-2 mt-s p-2 animate__animated animate__slow ${
                    hovered ? "flex animate__fadeIn" : "hidden"
                } hover`}
            >
                <img
                    src={Tick}
                    alt="done"
                    className="cursor-pointer"
                    onClick={handleStatusChange}
                />
                <img
                    src={More}
                    alt="menu icon"
                    className="cursor-pointer"
                    onClick={() => {
                        handleModal(true);
                    }}
                />
            </div>
            {modalOpen && (
                <div className="modal">
                    <h3>Modal content</h3>
                    <button
                        onClick={() => {
                            handleModal(false);
                        }}
                    >
                        Close Modal
                    </button>
                </div>
            )}
        </div>
    );
};

export default Card;
