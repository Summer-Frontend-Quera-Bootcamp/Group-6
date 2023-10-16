import logo from "@assets/images/logo.svg";
import { RightArrowIcon, UserIcon, SettingIcon, AccountIcon } from "./assets";
import MenuItem from "../MenuItem";
import Button from "../Button";
import { Link } from "react-router-dom";

const Navbar = () => {
    const menuItems = [
        { path: "/profile/details", icon: UserIcon, text: "اطلاعات فردی" },
        { path: "/profile/account", icon: AccountIcon, text: "اطلاعات حساب" },
        { path: "/profile/settings", icon: SettingIcon, text: "تنظیمات" },
    ];

    return (
        <div className="flex flex-col self-start w-[340px] items-end">
            <img src={logo} alt="logo" className="mt-[40px]" />
            <div className="flex flex-col items-end gap-[40px]">
                <Link to="/">
                    <Button
                        text="بازگشت"
                        icon={RightArrowIcon}
                        className={"mt-[75px]"}
                    />
                </Link>
                <div className="flex flex-col items-end gap-l w-[266px]">
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            path={item.path}
                            icon={item.icon}
                            text={item.text}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
