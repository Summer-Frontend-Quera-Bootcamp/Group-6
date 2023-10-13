import { ReactElement } from "react";
import { FormContainer } from "@components/common";
import LoginForm from "@/components/authentication/LoginForm";
import { Link } from "react-router-dom";

const Login: React.FC = (): ReactElement => {
    return (
        <FormContainer title="(: به کوئرا تسک منیجر خوش برگشتی">
            <LoginForm />
            <p className="text-body-m">
                <span className="font-[500]">ثبت‌نام نکرده‌ای؟ </span>
                <Link
                    className="text-brand-primary font-[800] hover:cursor-pointer"
                    to="/register"
                >
                    ثبت‌نام
                </Link>
            </p>
        </FormContainer>
    );
};

export default Login;
