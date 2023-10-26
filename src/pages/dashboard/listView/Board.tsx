import { useState } from "react";
import * as Icon from "../../../assets/icons/icons";
import TaskList from "./TaskList";
import { IBoardData } from "@/context/types/context.type";
import {ReactElement} from "react";

const Board = ({ boards }: { boards: IBoardData[] }):ReactElement => { 
    const [boardStates, setBoardStates] = useState(
        Array(boards.length).fill(false)
    );

    const toggleBoard = (index: number) => {
        setBoardStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <div >
            {boards.length > 0 ? (
                boards?.map((item: IBoardData, index: number) => (
                    <div key={item.id}>
                        <div className="flex flex-row-reverse py-[7px] items-center justify-between font-[200] mx-5">
                            <div className="W-[200PX] flex flex-row-reverse gap-xs">
                                <span
                                    className="mt-1.5 ml-2"
                                    onClick={() => toggleBoard(index)}
                                >
                                    <img
                                        src={Icon.CarrotCircleDown}
                                        alt="circleDown icon"
                                        style={{
                                            transform: boardStates[index]
                                                ? "rotate(180deg)"
                                                : "none",
                                        }}
                                    />
                                </span>
                                <span className=" rounded p-1 text-white"
                                style={{backgroundColor:`${item.color}`}}>
                                    {item.name}
                                </span>
                                <span dir="rtl">
                                    <span className="py-[5px] text-body-xs">
                                        {item.tasks?.length}
                                    </span>
                                    <span className="py-[5px] text-body-xs">
                                        تسك
                                    </span>
                                </span>
                            </div>
                            <div className="w-[473px] flex flex-row-reverse justify-between">
                                <span className="w-[70px] text-center ">
                                    اعضا
                                </span>
                                <span className="w-[70px] text-center ">
                                    ددلاين
                                </span>
                                <span className="w-[70px] text-center">
                                    اولويت
                                </span>
                                <span className="w-[70px] text-center">
                                    توضيحات
                                </span>
                            </div>
                        </div>
                        {boardStates[index] &&
                            (item.tasks.length > 0 ? (
                                <TaskList tasks={item.tasks} color={item.color} />
                            ) : (
                                <div className="flex flex-row-reverse gap-xs mx-16  my-3 text-red-primary">
                                    <p>تسکی وجود ندارد</p>
                                </div>
                            ))}
                    </div>
                ))
            ) : (
                <p>تسکی وجود ندارد</p>
            )}
        </div>
    );
};

export default Board;
