import React from "react";
import Card from "../Card";
import img from "@assets/images/workshop.jpg";

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
        description: " این یک تیتر برای این تسک 1 است",
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

const GroupColumn: React.FC<GroupProps> = ({ group }) => {
    const { title, borderColor, status } = group;

    const filteredCards = cardFakeData.filter(
        (card) => card.cardStatus === status
    );

    return (
        <div className={`flex flex-col mx-2`}>
            <div
                className={`w-[258px] border-t-2 rounded-[16px] shadow-md shadow-gray-200  py-2 px-3 my-2`}
                style={{ borderColor: borderColor }}
            >
                <h2>{title}</h2>
            </div>

            {filteredCards.map((card) => (
                <Card key={card.id} data={card} />
            ))}
        </div>
    );
};
export default GroupColumn;
