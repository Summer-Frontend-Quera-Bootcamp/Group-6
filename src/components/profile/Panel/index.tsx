import { ReactNode } from "react";

interface IPanelProps {
    Element: ReactNode;
}

const Panel: React.FC<IPanelProps> = ({ Element }) => {
    return (
        <div className="flex w-full py-[170px] pr-[58px] justify-end">
            {Element}
        </div>
    );
};

export default Panel;
