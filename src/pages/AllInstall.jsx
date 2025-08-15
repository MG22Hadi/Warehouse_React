import React from "react";
import MainLayout from "../MainLayout";
import AllInstallBox from "../components/AllInstallBox";


export default function AllInstall({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="ضبط تركيب ">
      <AllInstallBox />
    </MainLayout>
  );
}
