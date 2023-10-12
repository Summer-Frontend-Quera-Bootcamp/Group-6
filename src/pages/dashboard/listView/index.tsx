import { ReactElement } from "react";
import Task from "./Task";

const List: React.FC = (): ReactElement => {
    const data = [
        {
            status: { title: "pending", bg: "#F92E8F" },
            title: "اين يك تيتر براي اين تسك است",
            members: [" علي", "محمد"],
            deadline: "6آبان",
            priority: 1,
            description: "مخصوص پروژه اول",
        },
        {
            status: { title: "pending", bg: "#F92E8F" },
            title: "اين يك تيتر براي اين تسك است",
            members: [" باران", "اميد"],
            deadline: "6آبان",
            priority: 2,
            description: "--",
        },
        {
            status: { title: "done", bg: "#00FF00" },
            title: "اين يك تيتر براي اين تسك است",
            members: [" زينب", "مجتبي"],
            deadline: "6آبان",
            priority: 1,
            description: "--",
        },
        {
            status: { title: "in progress", bg: "#665500" },
            title: "اين يك تيتر براي اين تسك است",
            members: [" زينب", "مجتبي"],
            deadline: "6آبان",
            priority: 1,
            description: "--",
        },
    ];

    const pendingTask = data.filter((item) => item.status.title === "pending");
    const inProgressTask = data.filter(
        (item) => item.status.title === "in progress"
    );
    const doneTask = data.filter((item) => item.status.title === "done");
    return (
        <div className="flex flex-col mx-[50px]" dir="ltr">
            <h2 className="text-bold-xl text-right mt-[198px]">پرو‍‍ژه اول</h2>
            <Task task={pendingTask} />
            <Task task={inProgressTask} />
            <Task task={doneTask} />
        </div>
    );
};
export default List;
