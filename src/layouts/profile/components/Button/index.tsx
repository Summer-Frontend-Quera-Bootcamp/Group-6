import { usePalette } from "../../../../context/PaletteContext";

interface IButtonProps {
    className?: string;
    icon?: any;
    text?: string;
}

const Button: React.FC<IButtonProps> = ({ className, icon, text }) => {
    const { palette }: any = usePalette();
    return (
        <button
            title="return"
            className={
                "flex py-[4px] px-xs rounded-[8px] text-white gap-xs items-center " +
                className
            }
            style={{ backgroundColor: palette }}
        >
            <p className="text-body-l">{text}</p>
            {icon && (
                <img src={icon} title="arrow" className="w-[24px] h-[24px]" />
            )}
        </button>
    );
};

export default Button;
