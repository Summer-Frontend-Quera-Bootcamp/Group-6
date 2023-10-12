type PaletteColorType =
    | "#228BE6"
    | "#208D8E"
    | "#15AABF"
    | "#BE4BDB"
    | "#40C057"
    | "#4C6EF5"
    | "#82C91E"
    | "#FD7E14"
    | "#E64980"
    | "#FA5252"
    | "#12B886"
    | "#7950F2"
    | "#FAB005";

interface IPaletteContext {
    palette?: string;
    setDefault?: () => void;
    updatePalette?: () => void;
}

interface IPaletteContextProps {
    children: React.ReactNode;
}
