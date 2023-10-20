import React, { useContext, useEffect } from "react";
import { IUserDetailProps } from "@/types/newTask.types";
import { UserIcon } from "@/assets/pages/newTask";
import { onInputChange } from "@/utils/newTaskFunctions";
import useQueryParams from "@/utils/useQueryParams";
import { AppContext } from "@/context/store";
import { IProjects } from "@/context/types/context.type";

const TaskDetail: React.FC<IUserDetailProps> = ({ taskData, setTaskData }) => {
    const { space, project } = useQueryParams();
    const { state } = useContext(AppContext);

    const projects: IProjects[] = state.user.workspaces
        .filter(({ id }) => space === undefined || id === Number(space))
        .flatMap(
            ({ projects, id: idx }) =>
                projects?.map(({ id, name }) => ({ id, name, idx })) || []
        );

    const handleProjectChange = (event: any) => {
        const selectedId: number = Number(event.target.value);
        if (selectedId === 0) return;

        const selectedProject = projects?.find(
            (p) => p && p?.id === selectedId
        );
        selectedProject &&
            setTaskData((prev: any) => ({
                ...prev,
                project: selectedProject,
            }));
    };

    useEffect(() => {
        const defaultProject = projects?.find(
            (p) => p && p?.id === Number(project)
        );
        setTaskData((prev: any) => ({
            ...prev,
            project: defaultProject,
        }));
    }, []);

    return (
        <>
            <div className="flex justify-end items-center gap-xs self-stretch">
                <img
                    src={UserIcon}
                    alt="userIcon"
                    className="cursor-pointer border-[1px] border-dashed border-[#C1C1C1] rounded-full p-[7px]"
                />
                <p className="text-body-m">برای</p>
                <div className="flex w-[158px] py-[4px] px-xs justify-end items-center gap-[10px] rounded-[6px] ">
                    <select
                        id="projectDropdown"
                        value={taskData?.project?.id}
                        onChange={handleProjectChange}
                        className="flex w-[158px] py-[4px] px-xs justify-end items-center gap-[10px] rounded-[6px] border-[1px] border-[#E9EBF0] text-body-m"
                        dir="rtl"
                    >
                        <option value="">انتخاب کنید</option>
                        {projects?.map(
                            (item) =>
                                item && (
                                    <option
                                        key={item?.id}
                                        value={item?.id}
                                        className="outline-none border-none"
                                    >
                                        {item?.name}
                                    </option>
                                )
                        )}
                    </select>
                </div>
                <p className="text-body-m">در</p>
            </div>
            <textarea
                title="توضیحات تسک"
                className="flex h-[191px] pt-[19px] pr-l justify-end items-center self-stretch rounded-[12px] border-[1px] border-[#E2E2E2] bg-inherit placeholder-[#AEAEAE] plac text-right outline-none"
                placeholder={"توضیحاتی برای این تسک بنویسید"}
                dir="rtl"
                name="description"
                onChange={(e) => onInputChange(e, setTaskData)}
            />
        </>
    );
};

export { TaskDetail };
