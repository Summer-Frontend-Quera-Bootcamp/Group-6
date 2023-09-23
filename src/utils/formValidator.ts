import * as yup from "yup";

interface IValidationProps {
    error?: yup.ValidationError;
    isValid: boolean;
}

const passwordSchema = yup
    .string()
    .min(8, "رمز عبور باید 8 کاراکتر یا بیشتر باشد.")
    .matches(/\d/, "رمز عبور باید شامل اعداد باشد")
    .required("رمز عبور اجباری است.");

const isValidPassword = (password: string): Promise<IValidationProps> => {
    return passwordSchema
        .validate(password)
        .then(() => ({
            isValid: true,
        }))
        .catch((err: yup.ValidationError) => ({ error: err, isValid: false }));
};

const emailPattern = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const emailSchema = yup
    .string()
    .matches(emailPattern, "ایمیل وارد شده صحیح نمیباشد")
    .required("ایمیل اجباری است.");

const isValidEmail = (mail: string): Promise<IValidationProps> => {
    return emailSchema
        .validate(mail)
        .then(() => ({
            isValid: true,
        }))
        .catch((err: yup.ValidationError) => ({ error: err, isValid: false }));
};

const isValidName = (name: string): IValidationProps => {
    if (name.length > 0) return { isValid: true };
    else
        return {
            error: new yup.ValidationError("لطفا نام خود را وارد کنید."),
            isValid: false,
        };
};

const termSchema = yup
    .string()
    .is(["true"], "لطفاً برای ادامه قوانین و مقررات را بپذیرید")
    .required("فیلد قوانین و مقررات اجباری است.");

const isValidTerm = (name: string): Promise<IValidationProps> => {
    return termSchema
        .validate(name)
        .then(() => ({
            isValid: true,
        }))
        .catch((err: yup.ValidationError) => ({ error: err, isValid: false }));
};

const isValid = (
    name: string,
    schema: yup.StringSchema
): Promise<IValidationProps> => {
    return schema
        .validate(name)
        .then(() => ({
            isValid: true,
        }))
        .catch((err: yup.ValidationError) => ({ error: err, isValid: false }));
};

export { isValidPassword, isValidEmail, isValidName, isValid, isValidTerm };
export type { IValidationProps };
