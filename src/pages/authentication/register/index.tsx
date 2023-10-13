import React from "react";
import { FormContainer } from "@components/common";
import RegisterForm from "@/components/authentication/RegisterForm";

const Register: React.FC = () => {
    return (
        <FormContainer title="ثبت‌نام در کوئرا تسک منیجر">
            <RegisterForm />
        </FormContainer>
    );
};
export default Register;
