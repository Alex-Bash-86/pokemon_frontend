import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ToastProvider } from "./contexts/ToasterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
