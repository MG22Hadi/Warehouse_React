import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import getTheme from "./Theme.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import ResetSuccess from "./pages/login/ResetSuccess.jsx";

import Dashboard from "./pages/Dashborad-Content/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import ProductDetailsCard from "./pages/ProductDetailsCard.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import EntryNotes from "./pages/Notes/EntryNotes.jsx";
import Warehouses from "./pages/Warehouses.jsx";
import Settings from "./Settings.jsx";

export default function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* صفحات بدون layout */}
          <Route
            path="/signup"
            element={<SignUp mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/"
            element={<Login mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/reset-success"
            element={<ResetSuccess mode={mode} toggleTheme={toggleTheme} />}
          />

          {/* صفحات داخل layout (محمية) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/warehouse/:warehouseId"
            element={
              <ProtectedRoute>
                <Products mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/details/:id"
            element={
              <ProtectedRoute>
                <ProductDetailsCard mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetailsCard mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entry-notes"
            element={
              <ProtectedRoute>
                <EntryNotes mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/warehouses"
            element={
              <ProtectedRoute>
                <Warehouses mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
        </Routes> 
      </Router>
    </ThemeProvider>
  );
}
