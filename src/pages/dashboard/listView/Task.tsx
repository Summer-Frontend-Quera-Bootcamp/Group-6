import React, { ReactElement, useState } from "react";
import { PiCaretCircleDownBold } from "react-icons/pi";
import {IBoardData,ITaskData} from "@/context/types/context.type";

// interface ITask {
// attachment: string | null
// deadline: string | null
// description: string | null
// id: number
// members: []
// name: string
// order: number
// priority:number
// thumbnail: string|null
//     };


// interface ITaskStatus {
//     status: string;
//     bg: string;
//     onClick: () => void;
// }

// const TaskStatus: React.FC<ITaskStatus> = ({
//     status,
//     bg,
//     onClick,
// }): ReactElement => {
//     return (
//         <span
//             className={`text-white text-right rounded py-1 px-1.5`}
//             onClick={onClick}
//             style={{ backgroundColor: bg }}
//         >
//             {status}
//         </span>
//     );
// };

const Task: React.FC = (): ReactElement => {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };

    return (
        <div className="mb-[19px]">
            {/* <div className="w-[1011px] flex flex-row-reverse items-center justify-between">
                <div className="flex flex-row-reverse gap-xs">
                    {show && (
                        <span className="mt-1.5 ml-2" onClick={handleShow}>
                            <PiCaretCircleDownBold size={20} color={"grey"} />
                        </span>
                    )}
                    {boards && (
                        <TaskStatus
                            status={tasks[0].status.title}
                            bg={tasks[0].status.bg}
                            onClick={handleShow}
                        />
                    )}
                    <span dir="rtl">
                        <span className="py-[5px] text-body-xs">
                            {boards?.length}
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
                boards.tasks?.map((item:ITaskData, index:any) => (
                    <div
                        key={index}
                        className="w-[1011px] flex flex-row-reverse py-[7px] items-center justify-between font-[200]"
                    >
                        <div className=" flex flex-row-reverse items-first ">
                            {item.title === "pending" ? (
                                <div className="w-4 h-4 bg-[#F92E8F] rounded-[3px] my-2 mr-6"></div>
                            ) : item.status.title === "inProgress" ? (
                                <div className="w-4 h-4 bg-orange-primary rounded-[3px] my-2 mr-6"></div>
                            ) : (
                                <div className="w-4 h-4 bg-green-primary rounded-[3px] my-2 mr-6"></div>
                            )}
                            <p className="text-body-xs m-2"> {item.name}</p>
                        </div>
                        <div className="w-[473px] flex flex-row-reverse justify-between">
                            <span className="w-[70px] text-center text-body-xs">
                                {item.members}
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
                ))} */}
        </div>
    );
};
export default Task;
