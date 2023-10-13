import ResetForm from "@/components/authentication/ResetForm";
import { FormContainer } from "@components/common";
import { ReactElement } from "react";

const ResetPassword: React.FC = (): ReactElement => {
    return (
        <FormContainer title=" بازيابی رمز  عبور">
            <ResetForm />
        </FormContainer>
    );
};

export default ResetPassword;
