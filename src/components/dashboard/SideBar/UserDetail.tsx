import { ToggleTheme } from "@/components/common";
import { useContext } from "react";
import * as Icon from "../../../assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/store";
import { LogoutUser } from "@/context/user/user.action";

const UserDetail = () => {
    const { state, dispatch } = useContext(AppContext);
    const firstname = state.user.first_name;
    const lastname = state.user.last_name;
    const thumbnail = state.user.thumbnail;
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(LogoutUser());
        navigate("/login");
    };
    return (
        <div className="pb-[40px] self-stretch">
            <Link
                to="/profile"
                className="flex gap-3 items-center mb-6 cursor-pointer"
            >
                <div className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-blue-300 text-blue-700">
                    {thumbnail !== "https://quera.iran.liara.run" ? (
                        <img
                            src={thumbnail}
                            className=" w-[36px] h-[36px] rounded-full noFilter"
                        />
                    ) : (
                        "کاربر"
                    )}
                </div>
                <span>{`${firstname || "تنظیمات"} ${lastname}`}</span>
            </Link>
            <div className="flex items-center justify-between pl-[20px]">
                <span
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={handleLogOut}
                >
                    <img src={Icon.Exit} alt="exit icon" />
                    <span className="text-gray-400">خروج</span>
                </span>
                <span style={{ direction: "ltr" }}>
                    <ToggleTheme />
                </span>
            </div>
        </div>
    );
};

export default UserDetail;
