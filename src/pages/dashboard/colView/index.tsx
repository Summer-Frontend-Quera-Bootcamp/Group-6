import React, { useState, useEffect, useContext } from "react";
import * as Icon from "@/assets/icons/icons";
import { IBoardData } from "@/context/types/context.type";
import { fetchBoardsData } from "@/services/boards";
import { toast } from "react-toastify";
import { AppContext } from "@/context/store";
import useQueryParams from "@/utils/useQueryParams";
import NewBoard from "@/components/newBoard/NewBoard";
import BoardColumn from "@/components/dashboard/BoardColumn";

const ColView: React.FC = () => {
    const { state } = useContext(AppContext);
    const { space, project } = useQueryParams();
    const [boardsList, setBoardsList] = useState<IBoardData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [projectTitle, setProjectTitle] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            toast.loading("در حال دریافت تسک ها...");
            try {
                const data = await fetchBoardsData(state, project, space);
                if (data) {
                    const { boards, projectName } = data;
                    setProjectTitle(projectName);
                    setBoardsList(boards.sort((a, b) => a.id - b.id));
                    toast.success("تسک ها با موفقیت دریافت شدند.");
                } else {
                    toast.error("هنگام دریافت اطلاعات مشکلی پیش آمده.");
                }
            } catch (error) {
                toast.error("هنگام دریافت اطلاعات مشکلی پیش آمده.");
            } finally {
                toast.dismiss();
                setLoading(false);
            }
        };

        if (state && project && space) {
            getData();
        }
    }, [space, project, state]);

    const handleCreateBoard = () => {
        setShowModal(true);
    };

    return (
        <>
            {showModal && <NewBoard handleClose={setShowModal} />}
            {!space || !project ? (
                <p className="mx-4 py-3 px-5 text-sm bg-brand-secondary text-brand-primary rounded-full ">
                    لطفا یک پروژه انتخاب کنید
                </p>
            ) : loading ? (
                <p className="mx-4 py-3 px-5 text-sm bg-brand-secondary text-brand-primary rounded-full ">
                    در حال دریافت اطلاعات
                </p>
            ) : boardsList?.length === 0 ? (
                <>
                    <p className="mx-4 py-3 px-5 text-sm bg-brand-secondary text-brand-primary rounded-full ">
                        هیچ بوردی برای این پروژه ساخته نشده است. ساخت بورد جدید؟
                    </p>
                    <button
                        className="min-w-[258px] flex items-center gap-2 self-start border-t-1 rounded-[16px] shadow-md shadow-gray-200 py-2 px-3 m-2"
                        onClick={handleCreateBoard}
                    >
                        <img src={Icon.Plus} alt="icon" />
                        ساختن برد جدید
                    </button>
                </>
            ) : (
                <>
                    <div className="flex h-screen">
                        {boardsList &&
                            boardsList.map((board) => (
                                <BoardColumn
                                    key={board.id}
                                    board={board}
                                    projectTitle={projectTitle || ""}
                                />
                            ))}
                    </div>
                    <button
                        className="min-w-[258px] flex items-center gap-2 self-start border-t-1 rounded-[16px] shadow-md  py-2 px-3 m-2"
                        onClick={handleCreateBoard}
                    >
                        <img src={Icon.Plus} alt="icon" />
                        ساختن برد جدید
                    </button>
                </>
            )}
        </>
    );
};

export default ColView;
