import React, { useContext } from "react";
import useLocalStorage from "@hooks/useLocalStorage.ts";

const PaletteContext = React.createContext({});

export const usePalette = (): IPaletteContext => {
    return useContext(PaletteContext);
};

export const PaletteProvider = ({ children }: IPaletteContextProps) => {
    const [palette, setPalette] = useLocalStorage("PALETTE", "#208D8E");

    const setDefault = () => {
        setPalette("#208D8E");
    };

    const updatePalette = (color: PaletteColorType) => {
        const items = localStorage.getItem("PALETTE");
        if (items == null) return;
        setPalette(color);
    };

    return (
        <PaletteContext.Provider
            value={{
                palette,
                setDefault,
                updatePalette,
            }}
        >
            {children}
        </PaletteContext.Provider>
    );
};
