import { ReactElement, useContext, useEffect, useState } from "react";
import useQueryParams from "@/utils/useQueryParams";
import * as Icon from "../../../assets/icons/icons";
import Board from "./Board";
import { IBoardData } from "@/context/types/context.type";
import { fetchBoardsData } from "@/services/boards";
import { toast } from "react-toastify";
import { AppContext } from "@/context/store";

const List: React.FC = (): ReactElement => {
    const { state } = useContext(AppContext);
    const { space, project } = useQueryParams();
    const [boards, setBoards] = useState<IBoardData[]>();
    const [projectTitle, setProjectTitle] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            toast.loading("در حال دریافت تسک ها...");
            const data = await fetchBoardsData(state, project, space);
            toast.dismiss();

            if (data) {
                const { boards, projectName } = data;
                setBoards(boards);
                setProjectTitle(projectName);
                setLoading(false);
                toast.success("تسک ها با موفقیت دریافت شدند.");
            } else {
                toast.error("هنگام دریافت اطلاعات مشکلی پیش آمده.");
            }
        };
        if (space && project) getData();
    }, [space, project, state]);

    return (
        <div>
            <div
                className="flex flex-col mx-3 h-[100vh] overflow-auto"
                dir="ltr"
            >
                {!space || !project ? (
                    <p>لطفا یک پروژه انتخاب کنید</p>
                ) : loading ? (
                    <p>در حال دریافت</p>
                ) : space && project ? (
                    <>
                        <div className="flex flex-row-reverse justify-first my-5">
                            <img
                                src={Icon.CarrotCircleDown}
                                alt="circleDown icon"
                            />
                            <h2 className="font-extrabold pr-2 text-[20px] ">
                                {projectTitle}
                            </h2>
                        </div>
                        <div className="w-[1011px]">
                            {boards ? (
                                <Board boards={boards} />
                            ) : (
                                <p>بورد پیدا نشد</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>لطفا پروژه ای را انتخاب کنید</p>
                )}
            </div>
        </div>
    );
};

export default List;
