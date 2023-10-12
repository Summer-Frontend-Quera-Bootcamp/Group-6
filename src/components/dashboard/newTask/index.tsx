import React, { useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

import {
    FileAttachment,
    Flags,
    Footer,
    FooterIcons,
    Header,
    Tags,
    TextArea,
    TaskDetail,
} from "@components/newTask";
import CalendarForm from "@components/newTask/Calendar";
import useClickOutside from "@hooks/useClickOutside";
import { IModalsStatus } from "@/types/newTask.types";

interface INewTaskProps {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTask: React.FC<INewTaskProps> = ({ handleClose }) => {
    const [showModals, setShowModals] = useState<IModalsStatus>({
        tags: false,
        flags: false,
        calendar: false,
    });
    const { theme }: IThemeContext = useTheme();
    const tagRef = useRef(null);
    const footerRef = useRef(null);
    const calenderRef = useRef(null);

    useClickOutside([tagRef, footerRef, calenderRef], () => {
        //* اگر خارج از مودال های ورودی کلیک شود، همه مودال ها بسته میشوند
        setShowModals({
            tags: false,
            flags: false,
            calendar: false,
        });
    });

    return (
        <div
            className={`flex flex-col items-end bg-white w-[1100px] p-l gap-xl rounded-[20px] shadow-newTask relative justify-center ${theme}`}
        >
            {showModals.calendar && (
                <CalendarForm ref={calenderRef} setShowModal={setShowModals} />
            )}
            <Header taskName="عنوان تسک" closeModal={handleClose} />
            <TaskDetail spaceName="پروژه اول" />
            <TextArea />
            <FileAttachment />
            <span className="bg-inherit flex flex-col" ref={tagRef}>
                {showModals.tags && <Tags />}
                {showModals.flags && <Flags />}
            </span>
            <Footer>
                <span ref={footerRef}>
                    <FooterIcons
                        setShowModals={setShowModals}
                        showModals={showModals}
                    />
                </span>
            </Footer>
        </div>
    );
};

export default NewTask;
