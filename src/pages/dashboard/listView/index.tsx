import { ReactElement,useEffect,useState } from "react";
// import Task from "./Task";
import { fetchBoards } from "@/services/boards";
import  useQueryParams from "@/utils/useQueryParams";
import {IBoardData,ITaskData} from "@/context/types/context.type";
import * as Icon from "../../../assets/icons/icons";

const List: React.FC = (): ReactElement => {

    const {space, project }=useQueryParams();
     const[boards,setBoards]=useState<IBoardData[]>([])
     const[projectName,setProjectName]=useState<string>("")
     const [show, setShow] = useState(false);
     const handleShow = (state: boolean) => {
        setShow(state);
    };

    const getData = async () => {
    const data=  await fetchBoards(space,project)
    setBoards(()=>data.boardData)
    setProjectName(()=>data.projectName)
    }
    useEffect(() => {
        getData()
      },[boards])
   
    return (
        <div >
        <div className="flex flex-col mx-[50px]" dir="ltr">
            <div className="flex flex-row-reverse justify-first">
            <img src={Icon.CarrotCircleDown} alt="circleDown icon" />
            <h2 className="font-extrabold pr-2 text-[20px] ">{projectName}</h2>
            </div>
            <div className="w-[1011px] ">
            {boards.map((item,index)=>(
                <div key={index}>
                    <div  className="flex flex-row-reverse py-[7px] items-center justify-between font-[200]">
                    <div className="flex flex-row-reverse gap-xs">
                    {show && (
                        <span className="mt-1.5 ml-2" >
                            <img src={Icon.CarrotCircleDown} alt="circleDown icon" />
                        </span>
                    )}
                    <span 
                    className=" bg-green-primary rounded p-1 text-white"
                    onClick={()=>handleShow(!show)}
                    // className={`bg-${item.color}`}
                    > {item.name}</span>
                     <span dir="rtl">
                        <span className="py-[5px] text-body-xs">
                            {item.tasks?.length}
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
                {show && item.tasks?.map((item:ITaskData, index:any) => (
                <div
                    key={index}
                    className="w-[1011px] flex flex-row-reverse py-[7px] items-center justify-between font-[200]"
                >
                    <div className=" flex flex-row-reverse items-first ">
                    <span className="w-4 h-4 bg-green-primary rounded-[3px] my-2 mr-6"></span>
                        <p className="text-body-xs m-2"> {item.name}</p>
                    </div>
                    <div className="w-[473px] flex flex-row-reverse justify-between">
                        <span className="w-[70px] text-center text-body-xs">
                            {item.members?.map((member)=><span>{member}</span>)}
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
         ))}
         </div>
        </div>
        </div>
    );
};
export default List;
