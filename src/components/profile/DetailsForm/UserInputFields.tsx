import { Input } from "@/components/common";
import { IUserState } from "@/context/types/context.type";
import { IInputFieldsType } from "@/utils/profile";

interface IUserInputFieldsProps {
    userData: IUserState;
    inputFields: IInputFieldsType[];
}

export const UserInputFields: React.FC<IUserInputFieldsProps> = ({
    userData,
    inputFields,
}) => {
    return (
        <div className="flex flex-col items-start gap-s self-stretch text-body-s">
            {inputFields.map(({ type, labelText, name }) => (
                <Input
                    key={name}
                    type={type}
                    labelText={labelText}
                    classNames="text-black text-right"
                    name={name}
                    placeholder={userData?.[name as keyof IUserState]}
                />
            ))}
        </div>
    );
};
