import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
// import getTheme from "./Theme.jsx"; // استدعاء الدالة

// const defaultTheme = getTheme("light"); // توليد الثيم

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {/* <ThemeProvider theme={defaultTheme}> */}
      <CssBaseline />
      <App />
    </SnackbarProvider>
    {/* </ThemeProvider> */}
  </StrictMode>
);
