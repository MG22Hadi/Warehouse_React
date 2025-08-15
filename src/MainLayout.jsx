import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function MainLayout({ mode, toggleTheme, pageTitle, children }) {
  return (
    <div className="flex min-h-screen" dir="rtl">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <Navbar mode={mode} toggleTheme={toggleTheme} pageTitle={pageTitle} />

        <div className="flex-1 w-full h-auto ">
          {/* الصفحة الحالية */}
          <Box className="p-6">{children}</Box>
        </div>
      </main>
    </div>
  );
}
