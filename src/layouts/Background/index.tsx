import React, { ReactElement } from "react";
import svg from "../../assets/images/background.svg";

const Background: React.FC = (): ReactElement => {
    return (
        <div className="-z-10 w-[100vh] h-[100vh]">
            <img src={svg} alt="rectangle" />
        </div>
    );
};

export default Background;
