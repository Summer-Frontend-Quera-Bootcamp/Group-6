import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { PaletteProvider, ThemeProvider } from "./context";
import { TagsProvider } from "./context/TagsContext.tsx";
import { MessagesProvider } from "./context/MessagesContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* <UserProvider> */}
        <AuthProvider>
            <MessagesProvider>
                <PaletteProvider>
                    <ThemeProvider>
                        <TagsProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </TagsProvider>
                    </ThemeProvider>
                </PaletteProvider>
            </MessagesProvider>
        </AuthProvider>
        {/* </UserProvider> */}
    </React.StrictMode>
);
