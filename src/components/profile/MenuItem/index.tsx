import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";

interface IMenuItemProps {
    path: string;
    className?: string;
    icon?: string;
    text?: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({
    className,
    path,
    icon,
    text,
}) => {
    const currentPath = useLocation().pathname;
    const { theme }: IThemeContext = useTheme();

    const isActive =
        currentPath === path
            ? "bg-brand-secondary  font-[800] text-heading-xs text-black"
            : "";

    return (
        <Link
            to={path}
            className={`flex py-[4px] px-xs justify-end items-center gap-[11px] self-stretch text-body-l rounded-[4px] ${isActive} ${className}`}
        >
            <p>{text}</p>
            <img
                src={icon}
                title="menu-icon"
                alt="icon"
                className={`w-[24px] h-[24px] ${
                    theme === "dark" ? "text-white" : "text-black"
                }`}
            />
        </Link>
    );
};

export default MenuItem;
