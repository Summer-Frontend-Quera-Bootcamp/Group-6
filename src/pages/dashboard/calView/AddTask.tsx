export const AddTask: React.FC<{ theDate: string }> = ({
    theDate,
}): React.ReactNode => {
    return (
        <div className="modal newtaskModal">
            <input
                placeholder="نام تسک را وارد کنید "
                type="text"
                className="theInput"
            ></input>
            <button className="theButton">ساخت تسک </button>
            <p className="theP">{`${theDate}`}</p>
        </div>
    );
};
