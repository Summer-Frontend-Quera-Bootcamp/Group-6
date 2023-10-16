import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./context";
import { TagsProvider } from "./context/TagsContext.tsx";
import { MessagesProvider } from "./context/MessagesContext.tsx";

import { AppContextProvider } from "./context/store.tsx";
import { QueryClientStore } from "./services/queryClient.ts";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppContextProvider>
            <QueryClientProvider client={QueryClientStore}>
                <MessagesProvider>
                    <ThemeProvider>
                        <TagsProvider>
                            <BrowserRouter>
                                <ToastContainer rtl />
                                <App />
                            </BrowserRouter>
                        </TagsProvider>
                    </ThemeProvider>
                </MessagesProvider>
            </QueryClientProvider>
        </AppContextProvider>
    </React.StrictMode>
);
