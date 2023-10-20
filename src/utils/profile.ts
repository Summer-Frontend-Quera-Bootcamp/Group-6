export interface IInputFieldsType {
    type: string;
    labelText: string;
    name: string;
}
export const DetailsInputFields: IInputFieldsType[] = [
    {
        type: "text",
        labelText: "نام",
        name: "first_name",
    },
    {
        type: "text",
        labelText: "نام خانوادگی",
        name: "last_name",
    },
    {
        type: "tel",
        labelText: "شماره موبایل",
        name: "phone_number",
    },
];

export const AccountInputFields: IInputFieldsType[] = [
    {
        type: "text",
        labelText: "ایمیل",
        name: "email",
    },
    {
        type: "text",
        labelText: "نام کاربری",
        name: "username",
    },
    {
        type: "password",
        labelText: "رمز عبور فعلی",
        name: "old_password",
    },
    {
        type: "password",
        labelText: "رمز عبور جدید",
        name: "new_password",
    },
    {
        type: "password",
        labelText: "تکرار رمز عبور جدید",
        name: "new_password1",
    },
];

export const handleChangeImage = (
    fileRef: React.RefObject<HTMLInputElement>,
    handler: React.Dispatch<React.SetStateAction<string>>,
    defSrc: string
) => {
    const file = fileRef.current?.files?.[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                handler(reader.result);
            }
        };
    } else {
        handler(defSrc);
    }
};

export const isFormDataEmpty = (formData: FormData) =>
    !Array.from(formData.entries()).length;

export const appendDetailsFormData = (
    formData: FormData,
    name: string,
    value: string | Blob
) => {
    if (value !== "") formData.append(name, value);
};

export function appendAccountFormData(
    formData: FormData,
    fieldNames: any[],
    formElement: any
) {
    fieldNames.forEach((fieldName) => {
        const value = formElement[fieldName]?.value;
        if (value) {
            formData.append(fieldName, value);
        }
    });
}

export const appendFormData = (
    formData: FormData,
    name: string,
    value: string | Blob | any
) => {
    if (value !== "") formData.append(name, value);
};
