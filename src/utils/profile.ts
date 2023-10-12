export const inputFields = [
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

export const appendFormData = (
    formData: FormData,
    name: string,
    value: string | Blob
) => {
    if (value !== "") formData.append(name, value);
};
