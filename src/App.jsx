import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import getTheme from "./Theme.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import ResetSuccess from "./pages/login/ResetSuccess.jsx";
import AddProduct2 from "./pages/AddProduct2.jsx";
import Dashboard from "./pages/Dashborad-Content/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import ProductDetailsCard from "./pages/ProductDetailsCard.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import AddProduct3 from "./pages/AddProduct3.jsx";
import EntryNotes from "./pages/EntryNotes.jsx";
import ExitNotes from "./pages/ExitNotes.jsx";
import ReceivingNotes from "./pages/ReceivingNotes.jsx";
import ScrapNotes from "./pages/ScrapNotes.jsx";
import InstallReportsUser from "./pages/InstallReportsUser.jsx";
import AddProduct1 from "./pages/AddProduct1.jsx";
import InstallReportsStore from "./pages/InstallReportsStore";
import PurchaseRequests from "./pages/PurchaseRequests";
import CustodyManagement from "./pages/CustodyManagement";
import Notification from "./pages/Notification.jsx";
import AllEntry from "./pages/AllEntry.jsx";
import AllExit from "./pages/AllExit.jsx";
import AllReceiving from "./pages/AllReceiving.jsx";
import AllScrap from "./pages/AllScrap.jsx";
import AllPurchase from "./pages/AllPurchase.jsx";
import AllCustody from "./pages/AllCustody.jsx";
import AllInstall from "./pages/AllInstall.jsx";
import AllUserRequests from "./pages/AllUserRequests.jsx";
import Warehouses from "./pages/Warehouses.jsx";
import Settings from "./pages/Settings.jsx";

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

          {/* صفحات داخل layout */}
          <Route
            path="/dashboard"
            // element={<Dashboard mode={mode} toggleTheme={toggleTheme} />}
            element={
              <ProtectedRoute>
                <Dashboard mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            // element={<Products mode={mode} toggleTheme={toggleTheme} />}
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
          <Route
            path="/AddProduct1"
            element={
              <ProtectedRoute>
                <AddProduct1 mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddProduct2"
            element={
              <ProtectedRoute>
                <AddProduct2 mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddProduct3"
            element={
              <ProtectedRoute>
                <AddProduct3 mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EntryNotes"
            element={
              <ProtectedRoute>
                <EntryNotes mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ExitNotes"
            element={
              <ProtectedRoute>
                <ExitNotes mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ReceivingNotes"
            element={
              <ProtectedRoute>
                <ReceivingNotes mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ScrapNotes"
            element={
              <ProtectedRoute>
                <ScrapNotes mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/InstallReportsUser"
            element={
              <ProtectedRoute>
                <InstallReportsUser mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/InstallReportsStore"
            element={
              <ProtectedRoute>
                <InstallReportsStore mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/PurchaseRequests"
            element={
              <ProtectedRoute>
                <PurchaseRequests mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/CustodyManagement"
            element={
              <ProtectedRoute>
                <CustodyManagement mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Notification"
            element={
              <ProtectedRoute>
                <Notification mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllEntry"
            element={
              <ProtectedRoute>
                <AllEntry mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllExit"
            element={
              <ProtectedRoute>
                <AllExit mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllReceiving"
            element={
              <ProtectedRoute>
                <AllReceiving mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllScrap"
            element={
              <ProtectedRoute>
                <AllScrap mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllPurchase"
            element={
              <ProtectedRoute>
                <AllPurchase mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllCustody"
            element={
              <ProtectedRoute>
                <AllCustody mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllInstall"
            element={
              <ProtectedRoute>
                <AllInstall mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AllUserRequests"
            element={
              <ProtectedRoute>
                <AllUserRequests mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
