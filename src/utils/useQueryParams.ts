import { useLocation } from "react-router-dom";

const useQueryParams = () => {
    const search = useLocation().search;
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
};

export default useQueryParams;
