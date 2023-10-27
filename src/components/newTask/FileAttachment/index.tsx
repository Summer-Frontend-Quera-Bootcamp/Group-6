import { FileIcon } from "@/assets/pages/newTask";
import { onFileInputChange } from "@/utils/newTaskFunctions";

export const FileAttachment: React.FC<{
    name?: string;
    title?: string;
    setTaskData?: React.Dispatch<React.SetStateAction<any>>;
}> = ({ name, title, setTaskData }) => (
    <div className="flex justify-end items-center gap-[7px] self-stretch">
        <input
            type="file"
            className="hidden"
            id={`hidden-${name}-input`}
            name={name}
            onChange={(e) => setTaskData && onFileInputChange(e, setTaskData)}
        />
        <div className="flex py-1 px-2 justify-end items-center gap-1 rounded border border-brand-primary">
            <label
                htmlFor={`hidden-${name}-input`}
                className="cursor-pointer bg-transparent text-body-m"
            >
                آپلود فایل
            </label>
            <img src={FileIcon} alt="FileIcon" className="noFilter" />
        </div>
        <p className="text-body-m"> {`${title} افزودن`}</p>
    </div>
);
