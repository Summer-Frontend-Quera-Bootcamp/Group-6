import React, { useContext } from "react";
import useLocalStorage from "@hooks/useLocalStorage.ts";

const ThemeContext = React.createContext({});

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useLocalStorage("THEME", "light");

    const setDefault = () => {
        setTheme("light");
    };

    const toggleTheme = () => {
        const items = localStorage.getItem("THEME");
        if (items == null) return;
        theme === "dark" ? setTheme("light") : setTheme("dark");
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setDefault,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
