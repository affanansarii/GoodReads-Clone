import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BooksProvider } from "./contexts/BooksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <BooksProvider>
                    <App />
                </BooksProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
