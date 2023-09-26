import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { PaletteColorType } from "../types/palette.types";

const PaletteContext = React.createContext({});

export const usePalette = () => {
    return useContext(PaletteContext);
};

export const PaletteProvider = ({ children }: any) => {
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
