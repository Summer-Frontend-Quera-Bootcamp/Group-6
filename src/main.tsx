import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { PaletteProvider } from "./context/PaletteContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PaletteProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PaletteProvider>
    </React.StrictMode>
);
