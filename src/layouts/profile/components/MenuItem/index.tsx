import { Link, useLocation } from "react-router-dom";
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
    return (
        <Link
            to={path}
            className={`flex py-[4px] px-xs justify-end items-center gap-[11px] self-stretch text-body-l rounded-[4px] ${
                currentPath === path
                    ? "bg-brand-secondary  font-[800] text-heading-xs"
                    : "bg-white"
            } ${className}`}
        >
            <p className=" text-[#1E1E1E]">{text}</p>
            <img
                src={icon}
                title="menu-icon"
                alt="icon"
                className="w-[24px] h-[24px]"
            />
        </Link>
    );
};

export default MenuItem;
