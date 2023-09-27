import { Link } from "react-router-dom";
import logo from "@assets/images/logo.svg";

interface INavbarProps {
    statusText?: string;
    buttonText?: string;
}

const Navbar: React.FC<INavbarProps> = ({ statusText, buttonText }) => {
    return (
        <div className="z-[1000] fixed w-full">
            <nav className="flex items-center justify-between mt-[60px] mx-[80px]">
                <div className="flex items-center gap-xs">
                    <Link
                        to={buttonText === "ورود" ? "/login" : "/register"}
                        className="flex justify-center items-center w-[95px] h-[40px] bg-brand-primary text-white rounded-[6px] hover:cursor-pointer font-semibold text-bold-s"
                        aria-label={buttonText}
                    >
                        {buttonText}
                    </Link>

                    <span className="text-body-m">{statusText}</span>
                </div>
                <img src={logo} alt="logo" />
            </nav>
        </div>
    );
};

export default Navbar;
