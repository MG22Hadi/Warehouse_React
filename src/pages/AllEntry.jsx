import React from "react";
import MainLayout from "../MainLayout";
import AllEntryBox from "../components/AllEntryBox";


export default function AllEntry({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="مذكرات الادخال">
      <AllEntryBox />
    </MainLayout>
  );
}
