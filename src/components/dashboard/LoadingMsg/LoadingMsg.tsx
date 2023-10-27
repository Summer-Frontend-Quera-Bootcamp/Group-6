export const LoadingMsg = ({ title }: { title: string }) => {
    return (
        <p className="mx-4 py-3 px-5 text-sm bg-brand-secondary text-brand-primary rounded-full ">
            {title}
        </p>
    );
};

export default LoadingMsg;
