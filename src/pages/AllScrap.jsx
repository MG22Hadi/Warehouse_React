import React from "react";
import MainLayout from "../MainLayout";
import AllScrapBox from "../components/AllScrapBox";


export default function AllScrap({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="مذكرات اتلاف">
      <AllScrapBox />
    </MainLayout>
  );
}
