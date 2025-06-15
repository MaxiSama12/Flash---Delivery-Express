import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";    


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
