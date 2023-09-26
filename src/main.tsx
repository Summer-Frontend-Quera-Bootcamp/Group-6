import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { PaletteProvider, ThemeProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PaletteProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </PaletteProvider>
    </React.StrictMode>
);
