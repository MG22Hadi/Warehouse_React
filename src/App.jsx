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
import InstallReportsStore from "./pages/InstallReportsStore";

import AllPurchase from "./pages/AllPurchase.jsx";
import PurchaseRequests from "./pages/PurchaseRequests";
import CreatePurchaseNote from "./pages/CreatePurchaseNote.jsx";

import CustodyManagement from "./pages/CustodyManagement";
import Notification from "./pages/Notification.jsx";

import AllCustody from "./pages/AllCustody.jsx";
import AllUserRequests from "./pages/AllUserRequests.jsx";
import CreateCustodyNote from "./pages/CreateCustodyNote.jsx";

import Warehouses from "./pages/Warehouses.jsx";
import AddUsers3 from "./pages/AddUsers3";
import AddUsers2 from "./pages/AddUsers2";
import AddUsers4 from "./pages/AddUsers4.jsx";

import AddSupplier from "./pages/AddSupplier.jsx";

import AllInstallStore from "./pages/AllInstallStore.jsx";
import AllInstallReports from "./pages/AllInstallReports.jsx";

import AllUsers from "./pages/AllUsers.jsx";

import Settings from "./pages/Settings.jsx";
import AddUsers from "./pages/AddUsers.jsx";
import Manager from "./pages/Manager/Manager.jsx";
import CreateInstallBuyNote from "./pages/CreateInstallBuyNote.jsx";
import CreateInstallmosNote from "./pages/CreateInstallmosNote.jsx";


import InstallReportsStoreManager from "./pages/InstallReportsStoreManager.jsx"
import InstallReportsUserManager from "./pages/InstallReportsUserManager.jsx"
import ScrapNoteManager from "./pages/ScrapNoteManager"
import SortingMaterials from "./pages/SortingMaterials" 

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
            path="/EntryNotes"
            element={<EntryNotes mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/EntryNotes/:id"
            element={<EntryNotes mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/ExitNotes"
            element={<ExitNotes mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route path="/ExitNotes/:id" element={<ExitNotes />} />

          <Route
            path="/CreateEntryNote"
            element={<CreateEntryNote mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/CreateExitNote"
            element={<CreateExitNote mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/CreatePurchaseNote"
            element={
              <CreatePurchaseNote mode={mode} toggleTheme={toggleTheme} />
            }
          />
          <Route
            path="/CreateReceivingNote"
            element={
              <CreateReceivingNote mode={mode} toggleTheme={toggleTheme} />
            }
          />
          <Route
            path="/CreateScrapNote"
            element={<CreateScrapNote mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/ReceivingNotes"
            element={<ReceivingNotes mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/ScrapNotes"
            element={<ScrapNotes mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/InstallReportsUser"
            element={
              <InstallReportsUser mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/InstallReportsStore"
            element={
              <InstallReportsStore mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/PurchaseRequests"
            element={<PurchaseRequests mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/CustodyManagement"
            element={
              <CustodyManagement mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route path="/custody/specific/:id" element={<ScrapNotes />} />

          <Route
            path="/Notification"
            element={<Notification mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllEntry"
            element={<AllEntry mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllExit"
            element={<AllExit mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllReceiving"
            element={<AllReceiving mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllScrap"
            element={<AllScrap mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllPurchase"
            element={<AllPurchase mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllCustody"
            element={<AllCustody mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllInstall"
            element={<AllInstall mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllUserRequests"
            element={<AllUserRequests mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/CreateEntryNote"
            element={<CreateEntryNote mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/CreateExitNote"
            element={<CreateExitNote mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/CreateReceivingNote"
            element={
              <CreateReceivingNote mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/CreateScrapNote"
            element={<CreateScrapNote mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/CreatePurchaseNote"
            element={
              <CreatePurchaseNote mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/CreateCustodyNote"
            element={
              <CreateCustodyNote mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/Settings"
            element={<Settings mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/warehouses"
            element={<Warehouses mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AddSupplier"
            element={<AddSupplier mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AddSupplier/:id"
            element={<AddSupplier mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/AddUsers"
            element={<AddUsers mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/AddUsers/:id"
            element={<AddUsers mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/AddUsers2"
            element={<AddUsers2 mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AddUsers3"
            element={<AddUsers3 mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AddUsers4"
            element={<AddUsers4 mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/AllUsers"
            element={<AllUsers mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/Manager"
            element={<Manager mode={mode} toggleTheme={toggleTheme} />}
          />

          <Route
            path="/CreateInstallBuyNote"
            element={
              <CreateInstallBuyNote mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/CreateInstallmosNote"
            element={
              <CreateInstallmosNote mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/AllInstallReports"
            element={
              <AllInstallReports mode={mode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/AllInstallStore"
            element={<AllInstallStore mode={mode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/InstallReportsStoreManager"
            element={<InstallReportsStoreManager mode={mode} toggleTheme={toggleTheme} />}
            
/>

          <Route
            path="/InstallReportsUserManager"
            element={<InstallReportsUserManager mode={mode} toggleTheme={toggleTheme} />}
            
/>
 
  <Route
    path="/ScrapNoteManager"
    element={<ScrapNoteManager mode={mode} toggleTheme={toggleTheme} />}
    />

    

<Route
  path="/SortingMaterials"
  element={<SortingMaterials mode={mode} toggleTheme={toggleTheme} />}
  />


  
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
