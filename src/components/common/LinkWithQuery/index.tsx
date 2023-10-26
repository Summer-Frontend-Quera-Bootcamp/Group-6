import { Link, useLocation } from "react-router-dom";

export const LinkWithQuery = ({ children, to, className, ...props }: any) => {
    const { search } = useLocation();

    return (
        <Link to={to + search} className={className} {...props}>
            {children}
        </Link>
    );
};
