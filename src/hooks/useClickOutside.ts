import { RefObject, useEffect } from "react";

const useClickOutside = (
    refs: RefObject<HTMLElement>[],
    handler: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            let isOutside = true;

            for (const ref of refs) {
                if (ref.current && ref.current.contains(event.target as Node)) {
                    isOutside = false;
                    break;
                }
            }

            if (isOutside) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, handler]);
};

export default useClickOutside;
