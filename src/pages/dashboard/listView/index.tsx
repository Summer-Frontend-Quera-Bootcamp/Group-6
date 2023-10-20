import { ReactElement,useEffect,useState } from "react";
// import Task from "./Task";
import { fetchBoards } from "@/services/boards";
import  useQueryParams from "@/utils/useQueryParams";
import {IBoardData,ITaskData} from "@/context/types/context.type";


const List: React.FC = (): ReactElement => {
    // async function fetchBoards(): Promise<any> {
    //     const {space, project }=useQueryParams();
    //     // const x = window.location.href;
    //     // var regex = /space=(\d+)/
    //     // var regex1= /project=(\d+)/
    //     // var res = regex.exec(x);
    //     // var res1 = regex1.exec(x)
    //     // const workspaceId: string | null = (res !== null) ? res[1] : null;
    //     // const projectId: string | null = (res1 !== null) ? res1[1] : null;
    //     const workspaceId=space
    //     const projectId=project

 
    const {space, project }=useQueryParams();
     const[boards,setBoards]=useState<IBoardData[]>([])
     const[projectName,setProjectName]=useState<string>("")

    const getData = async () => {
    const data=  await fetchBoards(space,project)
    setBoards(()=>data.boardData)
    setProjectName(()=>data.projectName)
  console.log(boards)
    }
    // useEffect(() => {
    //     getData()
    //   }, [getData])
    //   console.log(data)

    // const data = [
    //     {
    //         status: { title: "pending", bg: "#F92E8F" },
    //         title: "اين يك تيتر براي اين تسك است",
    //         members: [" علي", "محمد"],
    //         deadline: "6آبان",
    //         priority: 1,
    //         description: "مخصوص پروژه اول",
    //     },
    //     {
    //         status: { title: "pending", bg: "#F92E8F" },
    //         title: "اين يك تيتر براي اين تسك است",
    //         members: [" باران", "اميد"],
    //         deadline: "6آبان",
    //         priority: 2,
    //         description: "--",
    //     },
    //     {
    //         status: { title: "done", bg: "#00FF00" },
    //         title: "اين يك تيتر براي اين تسك است",
    //         members: [" زينب", "مجتبي"],
    //         deadline: "6آبان",
    //         priority: 1,
    //         description: "--",
    //     },
    //     {
    //         status: { title: "in progress", bg: "#665500" },
    //         title: "اين يك تيتر براي اين تسك است",
    //         members: [" زينب", "مجتبي"],
    //         deadline: "6آبان",
    //         priority: 1,
    //         description: "--",
    //     },
    // ];
    // const boards= data.map((item)=>)

    // const pendingTask = data.filter((item) => item.status.title === "pending");
    // const inProgressTask = data.filter(
    //     (item) => item.status.title === "in progress"
    // );
    // const doneTask = data.filter((item) => item.status.title === "done");
    return (
        <div className="flex flex-col mx-[50px]" dir="ltr">
            <h2 className="text-bold-xl text-right">{projectName}</h2>
            {boards.map((item)=>
             item.tasks?.map((item:ITaskData, index:any) => (
                <div
                    key={index}
                    className="w-[1011px] flex flex-row-reverse py-[7px] items-center justify-between font-[200]"
                >
                    <div className=" flex flex-row-reverse items-first ">
                        {/* {item.title === "pending" ? (
                            <div className="w-4 h-4 bg-[#F92E8F] rounded-[3px] my-2 mr-6"></div>
                        ) : item.status.title === "inProgress" ? (
                            <div className="w-4 h-4 bg-orange-primary rounded-[3px] my-2 mr-6"></div>
                        ) : (
                            <div className="w-4 h-4 bg-green-primary rounded-[3px] my-2 mr-6"></div>
                        )} */}
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
            ))
            )}
            {/* <Task task={data.tasks} /> */}
            {/* <Task task={inProgressTask} />
            <Task task={doneTask} /> */}
            <button onClick={()=>getData()}>++</button>
        </div>
    );
};
export default List;
