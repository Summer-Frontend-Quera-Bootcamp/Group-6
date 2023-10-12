import React from "react";
import CheckBox from "@/components/common/CheckBox";

interface ITermCheckboxProps {
    acceptedTerms: boolean;
    setAcceptedTerms: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermCheckbox: React.FC<ITermCheckboxProps> = ({
    acceptedTerms,
    setAcceptedTerms,
}) => {
    return (
        <div className="flex gap-2 ml-auto">
            <CheckBox
                acceptedTerms={acceptedTerms}
                labelText=".قوانین و مقررات را می‌پذیرم"
                onChange={() => setAcceptedTerms((pervState) => !pervState)}
            />
        </div>
    );
};

export default TermCheckbox;
