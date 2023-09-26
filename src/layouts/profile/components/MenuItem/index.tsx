import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
interface IMenuItemProps {
    path: string;
    className?: string;
    icon?: any;
    text?: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({
    className,
    path,
    icon,
    text,
}) => {
    const currentPath = useLocation().pathname;
    const { theme }: any = useTheme();
    return (
        <Link
            to={path}
            className={`flex py-[4px] px-xs justify-end items-center gap-[11px] self-stretch text-body-l rounded-[4px] ${
                currentPath === path
                    ? "bg-brand-secondary  font-[800] text-heading-xs text-black"
                    : null
            } ${className}`}
        >
            <p>{text}</p>
            {/* TODO: FIX SVG THEME COLORS */}
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
