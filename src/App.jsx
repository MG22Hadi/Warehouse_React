import { useState, useMemo, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
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
import MonthlyMovement from "./pages/MonthlyMovement";

export default function App() {
  const [mode, setMode] =  useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
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
    {
      path: "/dashboard",
      element: Dashboard,
      allowedRoles: ["warehouseKeeper"],
    },
    { path: "/products", element: Products, allowedRoles: ["warehouseKeeper"] },
    {
      path: "/products/warehouse/:warehouseId",
      element: Products,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/products/details/:id",
      element: ProductDetailsCard,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/products/:id",
      element: ProductDetailsCard,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/calendar",
      element: CalendarPage,
      allowedRoles: ["warehouseKeeper"],
    },

    {
      path: "/AddProduct1",
      element: AddProduct1,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AddProduct2",
      element: AddProduct2,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AddProduct3",
      element: AddProduct3,
      allowedRoles: ["warehouseKeeper"],
    },

    { path: "/AllEntry", element: AllEntry, allowedRoles: ["warehouseKeeper"] },
    {
      path: "/EntryNotes",
      element: EntryNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/EntryNotes/:id",
      element: EntryNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/CreateEntryNote",
      element: CreateEntryNote,
      allowedRoles: ["warehouseKeeper"],
    },

    { path: "/AllExit", element: AllExit, allowedRoles: ["warehouseKeeper"] },
    {
      path: "/ExitNotes",
      element: ExitNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/ExitNotes/:id",
      element: ExitNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/CreateExitNote",
      element: CreateExitNote,
      allowedRoles: ["warehouseKeeper"],
    },

    { path: "/AllScrap", element: AllScrap, allowedRoles: ["warehouseKeeper"] },
    {
      path: "/ScrapNotes",
      element: ScrapNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/ScrapNotes/:id",
      element: ScrapNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/CreateScrapNote",
      element: CreateScrapNote,
      allowedRoles: ["warehouseKeeper"],
    },

    {
      path: "/AllReceiving",
      element: AllReceiving,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/ReceivingNotes",
      element: ReceivingNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/ReceivingNotes/:id",
      element: ReceivingNotes,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/CreateReceivingNote",
      element: CreateReceivingNote,
      allowedRoles: ["warehouseKeeper"],
    },

    {
      path: "/AllInstall",
      element: AllInstall,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/InstallReportsUser/:id",
      element: InstallReportsUser,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/InstallReportsStore/:id",
      element: InstallReportsStore,
      allowedRoles: ["warehouseKeeper"],
    },

    {
      path: "/AllPurchase",
      element: AllPurchase,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/PurchaseRequests",
      element: PurchaseRequests,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/PurchaseRequests/:id",
      element: PurchaseRequests,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/CreatePurchaseNote",
      element: CreatePurchaseNote,
      allowedRoles: ["warehouseKeeper"],
    },

    {
      path: "/CustodyManagement",
      element: CustodyManagement,
      allowedRoles: ["warehouse"],
    },
    {
      path: "/AllCustody",
      element: AllCustody,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AllUserRequests",
      element: AllUserRequests,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/CreateCustodyNote",
      element: CreateCustodyNote,
      allowedRoles: ["warehouseKeeper"],
    },

    {
      path: "/warehouses",
      element: Warehouses,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AddSupplier",
      element: AddSupplier,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AddSupplier/:id",
      element: AddSupplier,
      allowedRoles: ["warehouseKeeper"],
    },

    { path: "/AddUsers", element: AddUsers, allowedRoles: ["warehouseKeeper"] },
    {
      path: "/AddUsers/:id",
      element: AddUsers,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AddUsers2",
      element: AddUsers2,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AddUsers3",
      element: AddUsers3,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AddUsers4",
      element: AddUsers4,
      allowedRoles: ["warehouseKeeper"],
    },

    { path: "/AllUsers", element: AllUsers, allowedRoles: ["warehouseKeeper"] },
    { path: "/Manager", element: Manager, allowedRoles: ["manager"] },

    {
      path: "/CreateInstallBuyNote",
      element: CreateInstallBuyNote,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/CreateInstallmosNote",
      element: CreateInstallmosNote,
      allowedRoles: ["warehouseKeeper"],
    },

    {
      path: "/AllInstallReports",
      element: AllInstallReports,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/AllInstallStore",
      element: AllInstallStore,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/InstallReportsStoreManager",
      element: InstallReportsStoreManager,
      allowedRoles: ["warehouseKeeper" ,"manager"],
    },
    {
      path: "/InstallReportsStoreManager/:id",
      element: InstallReportsStoreManager,
      allowedRoles: ["warehouseKeeper" , "manager"],
    },
    {
      path: "/InstallReportsUserManager",
      element: InstallReportsUserManager,
      allowedRoles: ["warehouseKeeper", "manager"],
    },
    {
      path: "/InstallReportsUserManager/:id",
      element: InstallReportsUserManager,
      allowedRoles: ["warehouseKeeper" , "manager"],
    },
    {
      path: "/ScrapNoteManager",
      element: ScrapNoteManager,
      allowedRoles: ["warehouseKeeper" , "manager"],
    },
    {
      path: "/ScrapNoteManager/:id",
      element: ScrapNoteManager,
      allowedRoles: ["warehouseKeeper" , "manager"],
    },

    {
      path: "/Notification",
      element: Notification,
      allowedRoles: ["warehouseKeeper"],
    },
    { path: "/Settings", element: Settings, allowedRoles: ["warehouseKeeper"] },

    {
      path: "/ViewUserOrSupplier",
      element: ViewUserOrSupplier,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/SortingMaterials",
      element: SortingMaterials,
      allowedRoles: ["warehouseKeeper"],
    },
    {
      path: "/MonthlyMovement/:id",
      element: MonthlyMovement,
      allowedRoles: ["warehouseKeeper"],
    },
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
          {appRoutes.map(({ path, element: Component, allowedRoles }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  <Component mode={mode} toggleTheme={toggleTheme} />
                </ProtectedRoute>
              }
            />
          ))}
          {/* مسار افتراضي لأي URL غير معروف */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
