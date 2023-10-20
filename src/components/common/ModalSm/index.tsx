import { ForwardedRef, forwardRef, useState } from "react";
import * as Icon from "../../../assets/icons/icons";

interface Row {
    icon: string;
    text: string;
    color?: string;
}

interface IModalSmProps {
    rows: Row[];
    ref: React.RefObject<HTMLDivElement>;
    className: string;
}

const ModalSm = forwardRef<HTMLDivElement, IModalSmProps>(
    ({ rows, className }, ref: ForwardedRef<HTMLDivElement>) => {
        const [hoveredIndex, setHoveredIndex] = useState(-1);

        return (
            <div
                className={`bg-white shadow-md p-2 rounded-lg absolute z-50 ${className}`}
                ref={ref}
            >
                {rows.map((row, index) => (
                    <div key={index}>
                        <div
                            key={index}
                            className={`flex items-center gap-2 py-2 px-1 cursor-pointer rounded-md ${
                                hoveredIndex === index ? "bg-cyan-50" : ""
                            }`}
                            onMouseOver={() => {
                                setHoveredIndex(index);
                            }}
                            onMouseLeave={() => {
                                setHoveredIndex(-1);
                            }}
                        >
                            <span>
                                <img src={row.icon} alt="icon" />
                            </span>
                            {row.color != undefined ? (
                                <span className="text-sm text-[#9F0000]">
                                    {row.text}
                                </span>
                            ) : (
                                <span className="text-sm">{row.text}</span>
                            )}
                        </div>
                        {row.color != undefined && (
                            <div className="flex items-center py-2 px-5 cursor-pointer rounded-md my-3 w-[160px] h-[36px] bg-brand-primary text-sm font-semibold text-white shadow-sm  ">
                                <img src={Icon.WhiteShare} alt="icon" />
                                <span className="pr-2 font-body-xs">
                                    اشتراک گذاری
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
);

export default ModalSm;
