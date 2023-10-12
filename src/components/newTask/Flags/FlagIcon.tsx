import React from "react";

interface IFlagIcon {
    priority: number;
}

const getStrokeColor = (priority: number): string => {
    //* رنگ فلگ بر اساس اولویت آن انتخاب میشود
    switch (priority) {
        case 1:
            return "#FB0606";
        case 2:
            return "#FFE605";
        case 3:
            return "#09DBCE";
        case 4:
            return "#B2ACAC";
        default:
            return "#0000";
    }
};

const FlagIcon: React.FC<IFlagIcon> = ({ priority }) => {
    const strokeColor = getStrokeColor(priority);

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={strokeColor}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Group">
                <g id="Group_2">
                    <path
                        id="Path"
                        d="M4.16667 17.5V3.27502"
                        stroke={strokeColor}
                        strokeWidth="1.62499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Path_2"
                        d="M15.8333 11.6833V3.33337"
                        stroke={strokeColor}
                        strokeWidth="1.62499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Path_3"
                        d="M4.16663 11.6667C4.16663 11.6667 4.89579 11.0608 7.08328 11.0608C9.27077 11.0608 10.7291 12.5 12.9166 12.5C15.1041 12.5 15.8332 11.6858 15.8332 11.6858"
                        stroke={strokeColor}
                        strokeWidth="1.62499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Path_4"
                        d="M4.16663 3.27666C4.16663 3.27666 4.89579 2.5 7.08328 2.5C9.27077 2.5 10.7291 3.93916 12.9166 3.93916C15.1041 3.93916 15.8332 3.33333 15.8332 3.33333"
                        stroke={strokeColor}
                        strokeWidth="1.62499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
};

export default FlagIcon;
