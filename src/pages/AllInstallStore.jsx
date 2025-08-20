import React from "react";
import MainLayout from "../MainLayout";
import AllInstallStoreBox from "../components/AllInstallStoreBox";


export default function AllInstallStore({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="ضبط تركيب ">
      <AllInstallStoreBox />
    </MainLayout>
  );
}
