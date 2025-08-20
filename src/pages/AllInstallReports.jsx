import React from "react";
import MainLayout from "../MainLayout";
import AllInstallReportsBox from "../components/AllInstallReportsBox";


export default function AllInstallReports({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="ضبط تركيب ">
      <AllInstallReportsBox />
    </MainLayout>
  );
}
