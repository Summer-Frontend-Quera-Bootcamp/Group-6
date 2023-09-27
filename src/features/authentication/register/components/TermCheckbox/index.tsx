import { isValidTerm } from "@/utils/formValidator";

const TermCheckbox = ({ acceptedTerms, setAcceptedTerms, handler }: any) => (
    <div className="flex gap-2 ml-auto">
        <label htmlFor="acceptedTerms">.قوانین و مقررات را می‌پذیرم</label>
        <input
            type="checkbox"
            id="acceptedTerms"
            className="w-[18px] h-[18px]"
            checked={acceptedTerms}
            onChange={async (e) => {
                setAcceptedTerms(e.target.checked);
                await handler(
                    String(e.target.checked),
                    isValidTerm,
                    "termError"
                );
            }}
        />
    </div>
);

export default TermCheckbox;
