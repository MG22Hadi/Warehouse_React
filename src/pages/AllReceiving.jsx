import React from "react";
import MainLayout from "../MainLayout";
import AllReceivingBox from "../components/AllReceivingBox";


export default function AllReceiving({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="مذكرات استلام">
      <AllReceivingBox />
    </MainLayout>
  );
}
