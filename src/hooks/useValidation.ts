import { useState } from "react";
import {
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidTerm,
    isValidLogin,
} from "../utils/formValidator";

interface IFormState {
    emailError?: { isValid: boolean; message?: string };
    passError?: { isValid: boolean; message?: string };
    nameError?: { isValid: boolean; message?: string };
    termError?: { isValid: boolean; message?: string };
    loginError?: { isValid: boolean; message?: string };
    message?: string;
}

type ValidatorFunction =
    | typeof isValidEmail
    | typeof isValidPassword
    | typeof isValidName
    | typeof isValidTerm
    | typeof isValidLogin;

type Field =
    | "emailError"
    | "passError"
    | "nameError"
    | "termError"
    | "loginError";

const useFormValidation = () => {
    const [formStatus, setFormStatus] = useState<IFormState>({
        emailError: { isValid: true },
        passError: { isValid: true },
        nameError: { isValid: true },
        termError: { isValid: false },
        loginError: { isValid: true },
    });

    const handleFieldValidation = async (
        value:
            | string
            | {
                  email: string;
                  password: string;
              },
        validator: ValidatorFunction,
        field: Field
    ) => {
        const validationResult = await validator(value as any);

        setFormStatus((prevStatus) => ({
            ...prevStatus,
            [field]: {
                isValid: validationResult.isValid,
                message: validationResult.error?.message,
            },
            message: "",
        }));
        return validationResult;
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
