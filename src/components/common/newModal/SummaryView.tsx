import { AppContext } from "@/context/store";
import { useContext } from "react";

const SummaryView = (props: any) => {
    const { state } = useContext(AppContext);
    return (
        <div className="flex flex-col items-center rounded-lg justify-between titleDiv border-1 border-[#aaa] h-[196px]">
            <div className="MyStyle">
                <p className="text-sm font-extrabold capitalize">نام طراحی </p>
                <p className="text-sm font-extrabold capitalize">
                    {props.Data.name}
                </p>
            </div>
            <div className="MyStyle">
                <p className="text-sm font-extrabold capitalize">
                    رنگ ورک اسپیس
                </p>

                <div
                    style={{ backgroundColor: props.Data.color }}
                    className="w-[15px] h-[15px] rounded-sm"
                ></div>
            </div>
            <div className="MyStyle">
                <p className="text-sm font-extrabold capitalize"> اعضا </p>
                <img
                    src={state.user.thumbnail}
                    alt="userIcon"
                    className="cursor-pointer border-[1px] w-[34px] h-[34px] border-dashed border-[#C1C1C1] rounded-full noFilter"
                />
            </div>
        </div>
    );
};

export default SummaryView;
