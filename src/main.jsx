import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "@/router/routes.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
