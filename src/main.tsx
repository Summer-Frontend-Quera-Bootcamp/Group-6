import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./context";
import { MessagesProvider } from "./context/MessagesContext.tsx";
import { TagsProvider } from "./context/TagsContext.tsx";

import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/FullCalendar.css";
import { FilterProvider } from "./context/FilterContext";
import { AppContextProvider } from "./context/store.tsx";
import { QueryClientStore } from "./services/queryClient.ts";
import { NewTaskProvider } from "./context/NewTaskContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppContextProvider>
            <QueryClientProvider client={QueryClientStore}>
                <NewTaskProvider>
                    <MessagesProvider>
                        <FilterProvider>
                            <ThemeProvider>
                                <TagsProvider>
                                    <BrowserRouter>
                                        <ToastContainer rtl />
                                        <App />
                                    </BrowserRouter>
                                </TagsProvider>
                            </ThemeProvider>
                        </FilterProvider>
                    </MessagesProvider>
                </NewTaskProvider>
            </QueryClientProvider>
        </AppContextProvider>
    </React.StrictMode>
);
