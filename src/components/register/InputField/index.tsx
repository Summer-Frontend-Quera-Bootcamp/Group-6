import React from "react";
import { Input } from "@/components/common";

interface IInputFieldProps {
    labelText: string;
    type: string;
    validator?: any;
    handler?: (value: any, validator: any, field: any) => void;
    field?: string;
}

const InputField = React.forwardRef<HTMLInputElement, IInputFieldProps>(
    ({ labelText, type, validator, handler, field }, ref) => {
        const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            handler && (await handler(value, validator, field));
        };

        return (
            <Input
                type={type}
                ref={ref}
                onChange={(e) => {
                    if (handler) handleChange(e);
                }}
                labelText={labelText}
            />
        );
    }
);

export { InputField };
