import { FileIcon } from "@/assets/pages/newTask";

export const FileAttachment: React.FC = () => (
    <div className="flex justify-end items-center gap-1 self-stretch">
        <input type="file" className="hidden" id="hidden-file-input" />
        <div className="flex py-1 px-2 justify-end items-center gap-1 rounded border border-brand-primary">
            <label
                htmlFor="hidden-file-input"
                className="cursor-pointer bg-transparent text-body-m"
            >
                آپلود فایل
            </label>
            <img src={FileIcon} alt="FileIcon" />
        </div>
        <p className="text-body-m">افزودن پیوست</p>
    </div>
);
