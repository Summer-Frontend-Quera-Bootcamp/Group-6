import React, { useContext, useState } from "react";
import { useTasksMutation } from "@services/Tasks/mutations/useTasksMutation";
import { toast } from "react-toastify";
import { ITasksRequest } from "@/types/api.types";
import useQueryParams from "@/utils/useQueryParams";
import { AppContext } from "@/context/store";
import { Input, SubmitBtn } from "@/components/common";
import { useTheme } from "@/context/ThemeContext";

const PersianMonthNames: { [monthNumber: number]: string } = {
    1: "فروردین",
    2: "اردیبهشت",
    3: "خرداد",
    4: "تیر",
    5: "مرداد",
    6: "شهریور",
    7: "مهر",
    8: "آبان",
    9: "آذر",
    10: "دی",
    11: "بهمن",
    12: "اسفند",
};

const AddTask: React.FC<{ x: number; y: number; date: any }> = ({
    x,
    y,
    date,
}) => {
    const [taskName, setTaskName] = useState("");
    const taskMutation = useTasksMutation();
    const { space, project } = useQueryParams();
    const { state } = useContext(AppContext);

    const projects = state.user.workspaces
        .filter(({ id }) => space === undefined || id === Number(space))
        .flatMap(
            ({ projects, id: idx }) =>
                projects?.map(({ id, name }) => ({ id, name, idx })) || []
        );

    const handleSubmit = async () => {
        if (!space || !project) {
            toast.error("لطفا پروژه مورد نظر خود را انتخاب کنید");
            return;
        } else if (taskName.trim() === "") {
            toast.error("لطفا نام مورد نظر خود را وارد کنید");
            return;
        }

        const defaultProject = projects?.find(
            (p) => p && p?.id === Number(project)
        );

        let taskData: ITasksRequest = {
            name: taskName,
            deadline: String(date._i),
            project: defaultProject,
        };

        toast.dismiss();
        toast.loading("در حال افزودن");

        taskMutation.mutate(taskData, {
            onSuccess: async (e) => {
                toast.dismiss();
                toast.success("تسک با موفقیت افزوده شد.");

                console.log(e, taskData);
            },
            onError: (error) => {
                console.error(error);
                toast.error("هنگام افزودن تسک، مشکلی پیش آمده.");
            },
        });
    };

    const monthNumber = date.jMonth() + 1;
    const persianMonthName = PersianMonthNames[monthNumber];
    const dateFormatted = `${date.jDate()} ${persianMonthName}`;
    const { theme } = useTheme();
    return (
        <div
            className={`newtaskModal w-full ${theme}`}
            style={{ position: "fixed", top: y, left: x }}
        >
            <Input
                placeholder="نام تسک را وارد کنید"
                type="text"
                classNames="border-none focus:outline-none"
                defaultValue={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <div className="flex justify-between w-full">
                <p className="theP">{dateFormatted}</p>
                <SubmitBtn
                    value={"ساخت تسک"}
                    className="calendarBtn"
                    onSubmit={() => handleSubmit()}
                />
            </div>
        </div>
    );
};

export default AddTask;
