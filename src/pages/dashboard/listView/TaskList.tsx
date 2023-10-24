import { ITaskData } from "@/context/types/context.type";

const TaskList = ({ tasks }: { tasks: ITaskData[] }) =>
    tasks ? (
        tasks.map((item: ITaskData) => (
            <div
                key={item.id}
                className="w-[1011px] flex flex-row-reverse py-[7px] items-center justify-between font-[200]"
            >
                <div className=" flex flex-row-reverse items-first">
                    <span className="w-4 h-4 bg-green-primary rounded-[3px] my-2 mr-6"></span>
                    <p className="text-body-xs m-2"> {item.name}</p>
                </div>
                <div className="w-[473px] flex flex-row-reverse justify-between">
                    <span className="w-[70px] text-center text-body-xs">
                        {item.members &&
                            item.members.map(
                                (member: string, memberIndex: number) => (
                                    <span key={memberIndex}>{member}</span>
                                )
                            )}
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
        ))
    ) : (
        <p></p>
    );

export default TaskList;
