import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import getTheme from "./Theme.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import ResetSuccess from "./pages/login/ResetSuccess.jsx";
import Dashboard from "./pages/Dashborad-Content/Dashboard.jsx";
import Products from "./pages/Product/Products.jsx";
import ProductDetailsCard from "./pages/Product/ProductDetailsCard.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import Warehouses from "./pages/Warehouses.jsx";
import Settings from "./pages/Settings.jsx";

import AddProduct1 from "./pages/AddProduct1.jsx";
import AddProduct2 from "./pages/AddProduct2.jsx";
import AddProduct3 from "./pages/AddProduct3.jsx";

import EntryNotes from "./pages/EntryNotes.jsx";
import ExitNotes from "./pages/ExitNotes.jsx";

// import ReceivingNotes from "./pages/ReceivingNotes.jsx";
// import ScrapNotes from "./pages/ScrapNotes.jsx";
// import InstallReportsUser from "./pages/InstallReportsUser.jsx";
// import InstallReportsStore from "./pages/InstallReportsStore";
// import PurchaseRequests from "./pages/PurchaseRequests";
// import CustodyManagement from "./pages/CustodyManagement";

import Notification from "./pages/Notification.jsx";
import AllEntry from "./pages/AllEntry.jsx";
import AllExit from "./pages/AllExit.jsx";
import AllReceiving from "./pages/AllReceiving.jsx";
import AllScrap from "./pages/AllScrap.jsx";
import AllPurchase from "./pages/AllPurchase.jsx";
import AllCustody from "./pages/AllCustody.jsx";
import AllInstall from "./pages/AllInstall.jsx";
import AllUserRequests from "./pages/AllUserRequests.jsx";

export default function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

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
            element={<Dashboard mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/products"
            element={<Products mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/products/warehouse/:warehouseId"
            element={<Products mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/products/details/:id"
            element={<ProductDetailsCard />}
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetailsCard mode={mode} toggleTheme={toggleTheme} />
            }
          />
          <Route
            path="/calendar"
            element={<CalendarPage mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/AddProduct2"
            element={<AddProduct2 mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AddProduct1"
            element={<AddProduct1 mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AddProduct3"
            element={<AddProduct3 mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/entry-notes"
            element={<EntryNotes mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/exit-notes"
            element={<ExitNotes mode={mode} toggleTheme={toggleTheme} />}
          />
          {/* <Route
            path="/received-notes"
            element={<ReceivingNotes mode={mode} toggleTheme={toggleTheme} />}
          /> */}
          <Route
            path="/warehouses"
            element={<Warehouses mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/settings"
            element={<Settings mode={mode} toggleTheme={toggleTheme} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
