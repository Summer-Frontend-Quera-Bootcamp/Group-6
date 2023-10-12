import React, { ReactElement, useState } from "react";
import { PiCaretCircleDownBold } from "react-icons/pi";

interface ITask {
    task?: {
        status: {
            title: string;
            bg: string;
        };
        title: string;
        members: string[];
        deadline: string;
        priority: number;
        description: string;
    }[];
}

interface ITaskStatus {
    status: string;
    bg: string;
    onClick: () => void;
}

const TaskStatus: React.FC<ITaskStatus> = ({
    status,
    bg,
    onClick,
}): ReactElement => {
    return (
        <span
            className={`text-white text-right rounded py-1 px-1.5`}
            onClick={onClick}
            style={{ backgroundColor: bg }}
        >
            {status}
        </span>
    );
};

const Task: React.FC<ITask> = ({ task }): ReactElement => {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };

    return (
        <div className="mb-[19px]">
            <div className="w-[1011px] flex flex-row-reverse items-center justify-between">
                <div className="flex flex-row-reverse gap-xs">
                    {show && (
                        <span className="mt-1.5 ml-2" onClick={handleShow}>
                            <PiCaretCircleDownBold size={20} color={"grey"} />
                        </span>
                    )}
                    {task && (
                        <TaskStatus
                            status={task[0].status.title}
                            bg={task[0].status.bg}
                            onClick={handleShow}
                        />
                    )}
                    <span dir="rtl">
                        <span className="py-[5px] text-body-xs">
                            {task?.length}
                        </span>
                        <span className="py-[5px] text-body-xs"> تسك </span>
                    </span>
                </div>
                <div className="w-[473px] flex flex-row-reverse justify-between">
                    <span className="w-[70px] text-center ">اعضا</span>
                    <span className="w-[70px] text-center ">ددلاين</span>
                    <span className="w-[70px] text-center">اولويت</span>
                    <span className="w-[70px] text-center">توضيحات</span>
                </div>
            </div>
            {show &&
                task?.map((item, index) => (
                    <div
                        key={index}
                        className="w-[1011px] flex flex-row-reverse py-[7px] items-center justify-between font-[200]"
                    >
                        <div className=" flex flex-row-reverse items-first ">
                            {item.status.title === "pending" ? (
                                <div className="w-4 h-4 bg-[#F92E8F] rounded-[3px] my-2 mr-6"></div>
                            ) : item.status.title === "inProgress" ? (
                                <div className="w-4 h-4 bg-orange-primary rounded-[3px] my-2 mr-6"></div>
                            ) : (
                                <div className="w-4 h-4 bg-green-primary rounded-[3px] my-2 mr-6"></div>
                            )}
                            <p className="text-body-xs m-2"> {item.title}</p>
                        </div>
                        <div className="w-[473px] flex flex-row-reverse justify-between">
                            <span className="w-[70px] text-center text-body-xs">
                                {item.members.join("،  ")}
                            </span>
                            <span className="w-[70px] text-center text-body-xs">
                                {item.deadline}
                            </span>
                            <span className="w-[70px] text-center text-body-xs">
                                {item.priority}
                            </span>
                            <span className="w-[70px] text-center text-body-xs">
                                {item.description}
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    );
};
export default Task;
