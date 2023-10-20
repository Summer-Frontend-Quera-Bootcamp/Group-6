import React, {
    ReactElement,
    ReactNode,
    useContext,
    useRef,
    useState,
} from "react";
import SideBar from "@components/dashboard/SideBar";
import OptionBar from "@components/dashboard/OptionBar";
import { useTheme } from "@/context/ThemeContext";
import { NewTask } from "@/pages";
import Plus from "@assets/icons/Plus-white.svg";
import useClickOutside from "@/hooks/useClickOutside";
import ShareProject from "@/components/shareProject";
import { AppContext } from "@/context/store";

interface IDashboardLayoutProps {
    children?: ReactNode;
}

const DashBoardLayout: React.FC<IDashboardLayoutProps> = ({
    children,
}): ReactElement => {
    const { theme }: any = useTheme();
    const { state } = useContext(AppContext);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const modal = useRef(null);

    const handleModal = () => {
        setShowShareModal(true);
    };

    useClickOutside([modal], () => setShowTaskModal(false));

    return (
        <div className={`rtl h-[100vh] flex  ${theme} relative`}>
            <SideBar />
            <div className="w-[100%] h-[100vh]">
                <OptionBar openModals={handleModal} />
                <div
                    className="flex overflow-auto pl-[300px] min-h-[83vh]"
                    style={{
                        width: "calc(100vw-350px)",
                    }}
                >
                    {children}
                </div>
            </div>
            {showTaskModal && (
                <div
                    className="flex justify-center items-center  text-[#1E1E1E] modal"
                    dir="ltr"
                    ref={modal}
                >
                    <NewTask handleClose={setShowTaskModal} />
                </div>
            )}
            {showShareModal && (
                <div
                    className="flex justify-center items-center  text-[#1E1E1E] modal"
                    dir="ltr"
                >
                    <ShareProject
                        open={showShareModal}
                        setOpen={setShowShareModal}
                    />
                </div>
            )}

            <button
                className="text-white text-[14px] px-[12px] py-[8px] rounded-[6px] absolute bottom-10 left-12 flex items-center"
                onClick={() => {
                    setShowTaskModal((pervState) => !pervState);
                }}
                ref={modal}
                style={{ backgroundColor: state.theme }}
            >
                <img src={Plus} alt="add" />
                ساختن تسک
            </button>
        </div>
    );
};

export default DashBoardLayout;
