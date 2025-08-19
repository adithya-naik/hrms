import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0ProviderWrapper } from "./lib/auth0.tsx"; // adjust path if needed

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0ProviderWrapper>
      <App />
    </Auth0ProviderWrapper>
  </React.StrictMode>
);
