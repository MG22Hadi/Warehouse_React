import React from "react";
import MainLayout from "../MainLayout";
import AllCustodyBox from "../components/AllCustodyBox";


export default function AllCustody({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle=" عهدة شخصية">
      <AllCustodyBox />
    </MainLayout>
  );
}
