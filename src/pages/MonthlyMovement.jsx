import React from "react";
import MainLayout from "../MainLayout";
import MonthlyMovementBox from "../components/MonthlyMovementBox";


export default function AllEntry({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="">
      <MonthlyMovementBox />
    </MainLayout>
  );
}