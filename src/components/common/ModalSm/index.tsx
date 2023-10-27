import { ForwardedRef, forwardRef, useState } from "react";
import * as Icon from "../../../assets/icons/icons";
import ShareModal from "@/components/shareModal";
import { useTheme } from "@/context/ThemeContext";

interface Row {
    icon: string;
    text: string;
    color?: string;
    isSpace?: boolean;
    onSubmit?: (args: any) => any;
}

interface IModalSmProps {
    rows: Row[];
    ref: React.RefObject<HTMLDivElement>;
    className: string;
}

const ModalSm = forwardRef<HTMLDivElement, IModalSmProps>(
    ({ rows, className }, ref: ForwardedRef<HTMLDivElement>) => {
        const [_, setHoveredIndex] = useState(-1);
        const [showModal, setShowModal] = useState(false);
        const { theme } = useTheme();

        const handleShowModal = (state: boolean) => {
            setShowModal(state);
        };

        return (
            <div
                className={`bg-white shadow-md p-2 rounded-lg absolute z-10 ${theme} ${className}`}
                ref={ref}
            >
                {rows.map((row, index) => (
                    <>
                        <div key={index}>
                            <div
                                key={index}
                                className={`flex items-center gap-2 py-2 px-1 cursor-pointer rounded-md `}
                                onMouseOver={() => {
                                    setHoveredIndex(index);
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(-1);
                                }}
                                onClick={row.onSubmit}
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
                                <div
                                    className="flex items-center py-2 px-5 cursor-pointer rounded-md my-3 w-[160px] h-[36px] bg-brand-primary text-sm font-semibold text-white shadow-sm "
                                    onClick={() => {
                                        handleShowModal(true);
                                    }}
                                >
                                    <img src={Icon.WhiteShare} alt="icon" />
                                    <span className="pr-2 font-body-xs">
                                        اشتراک گذاری
                                    </span>
                                </div>
                            )}
                        </div>
                        {showModal == true &&
                            (row.isSpace != undefined ? (
                                <ShareModal
                                    open={showModal}
                                    setOpen={setShowModal}
                                    title={"اشتراک گذاری ورک اسپیس"}
                                    workspace={true}
                                />
                            ) : (
                                <ShareModal
                                    open={showModal}
                                    setOpen={setShowModal}
                                    title={"اشتراک گذاری پروژه"}
                                    workspace={false}
                                />
                            ))}
                    </>
                ))}
            </div>
        );
    }
);

export default ModalSm;
