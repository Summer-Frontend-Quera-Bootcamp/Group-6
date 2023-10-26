const Inputs = (props: any) => {
    const handleChange = (e: any) => {
        props.setData((prevData: any) => ({
            ...prevData,
            name: e.target?.value,
        }));
    };
    return (
        <div className="flex inputName flex-col items-end myWidth justify-between">
            <p className="text-sm text-right font-normal capitalize">
                {props.name}
            </p>
            <input
                type="text"
                className="h-10 w-full rounded-md myInput text-right p-1"
                dir="rtl"
                defaultValue={props.data.name}
                onChange={handleChange}
            />
        </div>
    );
};

export default Inputs;
