interface IThemeContext {
    theme?: string;
    setDefault?: () => void;
    toggleTheme?: () => void;
}

interface IThemeContextProps {
    children: React.ReactNode;
}
