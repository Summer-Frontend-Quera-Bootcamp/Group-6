import { loginAccount, registerAccount } from "@/services/Authentication";
import UserData from "@/types/userData.types";
import * as yup from "yup";

interface IValidationProps {
    data?: UserData;
    error?: yup.ValidationError;
    isValid: boolean;
}

interface ILoginCreds {
    username: string;
    password: string;
}

const emailPattern = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

//* Password Validation
const passwordSchema = yup
    .string()
    .required("رمز عبور اجباری است.")
    .min(8, "رمز عبور باید 8 کاراکتر یا بیشتر باشد.")
    .matches(/\d/, "رمز عبور باید شامل اعداد باشد");

const isPasswordValid = (password: string): Promise<IValidationProps> => {
    return passwordSchema
        .validate(password)
        .then(() => ({
            isValid: true,
        }))
        .catch((err: yup.ValidationError) => ({ error: err, isValid: false }));
};

//* Email Validation
const emailSchema = yup
    .string()
    .required("ایمیل اجباری است.")
    .matches(emailPattern, "ایمیل وارد شده صحیح نمیباشد");

const isEmailValid = (mail: string): Promise<IValidationProps> => {
    return emailSchema
        .validate(mail)
        .then(() => ({
            isValid: true,
        }))
        .catch((err: yup.ValidationError) => ({ error: err, isValid: false }));
};

//* Login Validation
const loginSchema = yup.object().shape({
    username: yup.string().required("نام کاربری اجباری است"),
    password: yup.string().required("رمز عبور اجباری است"),
});

const isLoginValid = (credentials: ILoginCreds): Promise<IValidationProps> => {
    return loginSchema
        .validate(credentials, { abortEarly: false })
        .then(async (validatedCreds) => {
            try {
                const UserData = {
                    username: validatedCreds.username,
                    password: validatedCreds.password,
                };
                const userData = await loginAccount(UserData);
                return {
                    data: userData,
                    isValid: true,
                };
            } catch (error) {
                console.log(error);
                return {
                    isValid: false,
                    error: new yup.ValidationError(
                        "رمز عبور و یا نام کاربری اشتباه است.",
                        validatedCreds,
                        "credentials"
                    ),
                };
            }
        })
        .catch((error) => {
            console.log(error);
            return {
                isValid: false,
                error: new yup.ValidationError(
                    "لطفا تمامی اطلاعات خواسته شده را وارد کنید."
                ),
            };
        });
};

//* Register Validation
const registerSchema = yup.object().shape({
    username: yup.string().required("نام کاربری اجباری است"),
    email: yup
        .string()
        .required("ایمیل اجباری است")
        .test(
            "is-email",
            "ایمیل وارد شده صحیح نمیباشد",
            (value) => !value || emailPattern.test(value)
        ),
    password: yup
        .string()
        .required("رمز عبور اجباری است.")
        .test(
            "is-long-enough",
            "رمز عبور باید 8 کاراکتر یا بیشتر باشد.",
            (value) => !value || value.length >= 8
        )
        .test(
            "has-number",
            "رمز عبور باید شامل اعداد باشد",
            (value) => !value || /\d/.test(value)
        ),
    term: yup
        .string()
        .required("فیلد قوانین و مقررات اجباری است.")
        .is(["true"], "لطفاً برای ادامه قوانین و مقررات را بپذیرید"),
});

interface IRegisterCreds {
    username: string;
    email: string;
    password: string;
    term: boolean;
}

const isRegisterValid = (
    credentials: IRegisterCreds
): Promise<IValidationProps> => {
    return registerSchema
        .validate(credentials, { abortEarly: false })
        .then(async (validatedCreds) => {
            try {
                const UserData = {
                    username: validatedCreds.username,
                    email: validatedCreds.email,
                    password: validatedCreds.password,
                };

                await registerAccount(UserData);
                return { isValid: true };
            } catch (err: any) {
                return {
                    isValid: false,
                    error: new yup.ValidationError(
                        "کاربری با این ایمیل وجود دارد، لطفا وارد شوید."
                    ),
                };
            }
        })
        .catch((error: yup.ValidationError) => {
            console.log(error);
            return {
                isValid: false,
                error: error,
            };
        });
};

export { isEmailValid, isLoginValid, isPasswordValid, isRegisterValid };
