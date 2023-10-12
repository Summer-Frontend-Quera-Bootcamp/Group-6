import React from "react";
import GroupColumn from "../../../components/dashboard/GroupColumn";

const groups = [
    {
        title: "Open",
        borderColor: "#FD7E14",
        status: "open",
    },
    {
        title: "In Progress",
        borderColor: "#4C6EF5",
        status: "in progress",
    },
    {
        title: "Pending",
        borderColor: "#FAB005",
        status: "pending",
    },
    {
        title: "To Do",
        borderColor: "#FD7E14",
        status: "todo",
    },
    {
        title: "Done",
        borderColor: "#40C057",
        status: "done",
    },
];

const ColView: React.FC = () => {
    return (
        <>
            {groups.map((group) => (
                <GroupColumn key={group.title} group={group} />
            ))}
        </>
    );
};

export default ColView;
