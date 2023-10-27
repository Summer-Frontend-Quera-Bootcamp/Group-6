export type FieldType =
    | "emailError"
    | "passError"
    | "nameError"
    | "termError"
    | "loginError";

export type ValueType =
    | string
    | {
          email: string;
          password: string;
      }
    | {
          username: string;
          password: string;
      };

export interface IFormState {
    emailError?: { isValid: boolean; message?: string };
    passError?: { isValid: boolean; message?: string };
    nameError?: { isValid: boolean; message?: string };
    termError?: { isValid: boolean; message?: string };
    loginError?: { isValid: boolean; message?: string };
    message?: string;
}
