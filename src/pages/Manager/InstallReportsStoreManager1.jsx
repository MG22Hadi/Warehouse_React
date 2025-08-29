// import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useTheme } from "@mui/material/styles";
// import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import InstallStore from "../components/InstallStore";

export default function InstallReportsStoreManager1({ mode, toggleTheme }) {
  const theme = useTheme();

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <InstallStore />
      </div>
    </MainLayout>
  );
}
