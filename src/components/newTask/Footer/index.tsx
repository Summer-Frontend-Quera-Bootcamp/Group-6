import { TagIcon, CalendarIcon, FlagIcon } from "@/assets/pages/newTask";
import { SubmitBtn } from "@/components/common";
import {
    IFooterIconsProps,
    IModalsStatus,
    IconProps,
} from "@/types/newTask.types";
import { ReactNode } from "react";

const Footer: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex justify-between items-center self-stretch">
            <SubmitBtn
                value="ساختن تسک"
                ariaLabel="ساختن تسک"
                className="w-[125px] h-l py-[4px] px-[7px] text-body-xs"
            />
            {children}
        </div>
    );
};

const FooterIcons: React.FC<IFooterIconsProps> = ({
    showModals,
    setShowModals,
}) => {
    const icons: Array<{
        src: any;
        alt: string;
        property: keyof IModalsStatus;
    }> = [
        { src: TagIcon, alt: "Tag Icon", property: "tags" },
        { src: CalendarIcon, alt: "Calendar Icon", property: "calendar" },
        { src: FlagIcon, alt: "Flag Icon", property: "flags" },
    ];

    return (
        <div className="flex justify-end items-center gap-m">
            {icons.map((icon) => (
                <IconSpan
                    key={icon.property}
                    src={icon.src}
                    alt={icon.alt}
                    property={icon.property}
                    showModals={showModals}
                    setShowModals={setShowModals}
                />
            ))}
        </div>
    );
};

const IconSpan: React.FC<IconProps> = ({
    src,
    alt,
    property,
    setShowModals,
}) => {
    const handleIconClick = () =>
        //* با توجه به آیکون کلیک شده، مدال موردنظر باز میشود
        setShowModals((prev) => ({
            ...prev,
            flags: false,
            tags: false,
            calendar: false,
            [property]: !prev[property],
        }));
    return (
        <span
            className="flex w-[50px] h-[50px] p-[6px] justify-center items-center rounded-[139px] border-[1px] border-dashed border-[#C1C1C1] cursor-pointer"
            onClick={handleIconClick}
        >
            <img src={src} alt={alt} />
        </span>
    );
};

export { Footer, FooterIcons };
