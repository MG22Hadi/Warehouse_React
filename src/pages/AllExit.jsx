import React from "react";
import MainLayout from "../MainLayout";
import AllExitBox from "../components/AllExitBox";


export default function AllExit({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="مذكرات اخراج">
      <AllExitBox />
    </MainLayout>
  );
}
