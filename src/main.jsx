import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
// import getTheme from "./Theme.jsx"; // استدعاء الدالة

// const defaultTheme = getTheme("light"); // توليد الثيم

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ThemeProvider theme={defaultTheme}> */}
    <CssBaseline />
    <App />
    {/* </ThemeProvider> */}
  </StrictMode>
);
