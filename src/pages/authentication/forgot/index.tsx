import { ReactElement } from "react";

import { FormContainer, MessageDisplay } from "@components/common";
import ForgotForm from "@/components/authentication/ForgotForm";
import { useMessages } from "@/context/MessagesContext";

const Forgot: React.FC = (): ReactElement => {
    const { messages } = useMessages();

    return (
        <FormContainer title="فراموشی رمز عبور">
            {messages?.type === "success" && (
                <MessageDisplay messages={messages.msg} type={messages.type} />
            )}
            <ForgotForm />
        </FormContainer>
    );
};

export default Forgot;
