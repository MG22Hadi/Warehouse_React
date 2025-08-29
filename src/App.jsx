import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalNotifier from "./utils/GlobalNotifier";

import getTheme from "./Theme.jsx";

// صفحات الدخول والتوثيق
import SignUp from "./pages/login/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import ResetSuccess from "./pages/login/ResetSuccess.jsx";

// باقي الصفحات
import Dashboard from "./pages/Dashborad-Content/Dashboard.jsx";
import Products from "./pages/Product/Products.jsx";
import ProductDetailsCard from "./pages/Product/ProductDetailsCard.jsx";
import CalendarPage from "./pages/Calendar.jsx";

import AddProduct1 from "./pages/AddProduct1.jsx";
import AddProduct2 from "./pages/AddProduct2.jsx";
import AddProduct3 from "./pages/AddProduct3.jsx";

import AllEntry from "./pages/AllEntry.jsx";
import EntryNotes from "./pages/EntryNotes.jsx";
import CreateEntryNote from "./pages/CreateEntryNote.jsx";

import AllExit from "./pages/AllExit.jsx";
import ExitNotes from "./pages/ExitNotes.jsx";
import CreateExitNote from "./pages/CreateExitNote.jsx";

import AllScrap from "./pages/AllScrap.jsx";
import ScrapNotes from "./pages/ScrapNotes.jsx";
import CreateScrapNote from "./pages/CreateScrapNote.jsx";

import AllReceiving from "./pages/AllReceiving.jsx";
import ReceivingNotes from "./pages/ReceivingNotes.jsx";
import CreateReceivingNote from "./pages/CreateReceivingNote.jsx";

import AllInstall from "./pages/AllInstall.jsx";
import InstallReportsUser from "./pages/InstallReportsUser.jsx";
import InstallReportsStore from "./pages/InstallReportsStore.jsx";

import AllPurchase from "./pages/AllPurchase.jsx";
import PurchaseRequests from "./pages/PurchaseRequests.jsx";
import CreatePurchaseNote from "./pages/CreatePurchaseNote.jsx";

import CustodyManagement from "./pages/CustodyManagement.jsx";
import Notification from "./pages/Notification.jsx";

import AllCustody from "./pages/AllCustody.jsx";
import AllUserRequests from "./pages/AllUserRequests.jsx";
import CreateCustodyNote from "./pages/CreateCustodyNote.jsx";

import Warehouses from "./pages/Warehouses.jsx";
import AddUsers from "./pages/AddUsers.jsx";
import AddUsers2 from "./pages/AddUsers2.jsx";
import AddUsers3 from "./pages/AddUsers3.jsx";
import AddUsers4 from "./pages/AddUsers4.jsx";

import AddSupplier from "./pages/AddSupplier.jsx";

import AllInstallStore from "./pages/AllInstallStore.jsx";
import AllInstallReports from "./pages/AllInstallReports.jsx";

import AllUsers from "./pages/AllUsers.jsx";

import Settings from "./pages/Settings.jsx";
import Manager from "./pages/Manager/Manager.jsx";
import CreateInstallBuyNote from "./pages/CreateInstallBuyNote.jsx";
import CreateInstallmosNote from "./pages/CreateInstallmosNote.jsx";

import InstallReportsStoreManager from "./pages/InstallReportsStoreManager.jsx";
import InstallReportsUserManager from "./pages/InstallReportsUserManager.jsx";
import ScrapNoteManager from "./pages/ScrapNoteManager.jsx";

import ViewUserOrSupplier from "./pages/ViewUserOrSupplier.jsx";
import SortingMaterials from "./pages/SortingMaterials.jsx";

export default function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  // صفحات ما تحتاج layout (دخول/تسجيل)
  const authRoutes = [
    { path: "/signup", element: SignUp },
    { path: "/", element: Login },
    { path: "/reset-password", element: ResetPassword },
    { path: "/reset-success", element: ResetSuccess },
  ];

  // باقي الصفحات
  const appRoutes = [
    { path: "/dashboard", element: Dashboard },
    { path: "/products", element: Products },
    { path: "/products/warehouse/:warehouseId", element: Products },
    { path: "/products/details/:id", element: ProductDetailsCard },
    { path: "/products/:id", element: ProductDetailsCard },
    { path: "/calendar", element: CalendarPage },

    { path: "/AddProduct1", element: AddProduct1 },
    { path: "/AddProduct2", element: AddProduct2 },
    { path: "/AddProduct3", element: AddProduct3 },

    { path: "/AllEntry", element: AllEntry },
    { path: "/EntryNotes", element: EntryNotes },
    { path: "/EntryNotes/:id", element: EntryNotes },
    { path: "/CreateEntryNote", element: CreateEntryNote },

    { path: "/AllExit", element: AllExit },
    { path: "/ExitNotes", element: ExitNotes },
    { path: "/ExitNotes/:id", element: ExitNotes },
    { path: "/CreateExitNote", element: CreateExitNote },

    { path: "/AllScrap", element: AllScrap },
    { path: "/ScrapNotes", element: ScrapNotes },
    { path: "/ScrapNotes/:id", element: ScrapNotes },
    { path: "/CreateScrapNote", element: CreateScrapNote },

    { path: "/AllReceiving", element: AllReceiving },
    { path: "/ReceivingNotes", element: ReceivingNotes },
    { path: "/ReceivingNotes/:id", element: ReceivingNotes },
    { path: "/CreateReceivingNote", element: CreateReceivingNote },

    { path: "/AllInstall", element: AllInstall },
    { path: "/InstallReportsUser/:id", element: InstallReportsUser },
    { path: "/InstallReportsStore/:id", element: InstallReportsStore },

    { path: "/AllPurchase", element: AllPurchase },
    { path: "/PurchaseRequests", element: PurchaseRequests },
    { path: "/PurchaseRequests/:id", element: PurchaseRequests },
    { path: "/CreatePurchaseNote", element: CreatePurchaseNote },

    { path: "/CustodyManagement", element: CustodyManagement },
    { path: "/AllCustody", element: AllCustody },
    { path: "/AllUserRequests", element: AllUserRequests },
    { path: "/CreateCustodyNote", element: CreateCustodyNote },

    { path: "/warehouses", element: Warehouses },
    { path: "/AddSupplier", element: AddSupplier },
    { path: "/AddSupplier/:id", element: AddSupplier },

    { path: "/AddUsers", element: AddUsers },
    { path: "/AddUsers/:id", element: AddUsers },
    { path: "/AddUsers2", element: AddUsers2 },
    { path: "/AddUsers3", element: AddUsers3 },
    { path: "/AddUsers4", element: AddUsers4 },

    { path: "/AllUsers", element: AllUsers },
    { path: "/Manager", element: Manager },

    { path: "/CreateInstallBuyNote", element: CreateInstallBuyNote },
    { path: "/CreateInstallmosNote", element: CreateInstallmosNote },

    { path: "/AllInstallReports", element: AllInstallReports },
    { path: "/AllInstallStore", element: AllInstallStore },
    {
      path: "/InstallReportsStoreManager",
      element: InstallReportsStoreManager,
    },
    {
      path: "/InstallReportsStoreManager/:id",
      element: InstallReportsStoreManager,
    },
    { path: "/InstallReportsUserManager", element: InstallReportsUserManager },
    {
      path: "/InstallReportsUserManager/:id",
      element: InstallReportsUserManager,
    },
    { path: "/ScrapNoteManager", element: ScrapNoteManager },
    { path: "/ScrapNoteManager/:id", element: ScrapNoteManager },

    { path: "/Notification", element: Notification },
    { path: "/Settings", element: Settings },

    { path: "/ViewUserOrSupplier", element: ViewUserOrSupplier },
    { path: "/SortingMaterials", element: SortingMaterials },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalNotifier />
      <Router>
        <Routes>
          {/* مسارات الدخول */}
          {authRoutes.map(({ path, element: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component mode={mode} toggleTheme={toggleTheme} />}
            />
          ))}

          {/* باقي المسارات */}
          {appRoutes.map(({ path, element: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component mode={mode} toggleTheme={toggleTheme} />}
            />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
