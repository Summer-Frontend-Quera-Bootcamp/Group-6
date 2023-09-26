import logo from "../../../../assets/images/logo.svg";
import Button from "../Button";
import { RightArrowIcon, UserIcon, SettingIcon, AccountIcon } from "./assets";
import MenuItem from "../MenuItem";

const Navbar = () => {
    return (
        <div className="flex flex-col self-start w-[340px] items-end">
            <img src={logo} alt="logo" className="mt-[40px]" />
            <div className="flex flex-col items-end gap-[40px]">
                <Button
                    text="بازگشت"
                    icon={RightArrowIcon}
                    className={"mt-[75px]"}
                />
                <div className="flex flex-col items-end gap-l w-[266px] ">
                    <MenuItem
                        path="/profile/details"
                        icon={UserIcon}
                        text="اطلاعات فردی"
                    />
                    <MenuItem
                        path="/profile/account"
                        icon={AccountIcon}
                        text="اطلاعات حساب"
                    />
                    <MenuItem
                        path="/profile/settings"
                        icon={SettingIcon}
                        text="تنظیمات"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
