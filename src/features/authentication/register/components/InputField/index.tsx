import { Input } from "@/components/common";
import React from "react";

const InputField = React.forwardRef<HTMLInputElement, any>(
    ({ labelText, type, validator, handler, field }, ref) => (
        <Input
            type={type}
            ref={ref}
            onChange={async (e) =>
                await handler(e.target.value, validator, field)
            }
            labelText={labelText}
        />
    )
);

export { InputField };
