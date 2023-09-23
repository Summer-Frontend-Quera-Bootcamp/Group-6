import { useState } from "react";
import {
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidTerm,
} from "../utils/formValidator";

interface IFormState {
    emailError?: { isValid: boolean; message?: string };
    passError?: { isValid: boolean; message?: string };
    nameError?: { isValid: boolean; message?: string };
    termError?: { isValid: boolean; message?: string };
    message?: string;
}

type ValidatorFunction =
    | typeof isValidEmail
    | typeof isValidPassword
    | typeof isValidName
    | typeof isValidTerm;

type Field = "emailError" | "passError" | "nameError" | "termError";

const useFormValidation = () => {
    const [formStatus, setFormStatus] = useState<IFormState>({
        emailError: { isValid: true },
        passError: { isValid: true },
        nameError: { isValid: true },
        termError: { isValid: false },
    });

    const handleFieldValidation = async (
        value: string,
        validator: ValidatorFunction,
        field: Field
    ) => {
        const validationResult = await validator(value);

        setFormStatus((prevStatus) => ({
            ...prevStatus,
            [field]: {
                isValid: validationResult.isValid,
                message: validationResult.error?.message,
            },
            message: "",
        }));
    };

    const setMessage = (message: string) => {
        setFormStatus((prevStatus) => ({
            ...prevStatus,
            message,
        }));
    };

    return { formStatus, handleFieldValidation, setMessage };
};

export default useFormValidation;
