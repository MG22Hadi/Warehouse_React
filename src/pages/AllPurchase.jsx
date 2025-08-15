import React from "react";
import MainLayout from "../MainLayout";
import AllPurchaseBox from "../components/AllPurchaseBox";


export default function AllPurchase({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="طلبات شراء ">
      <AllPurchaseBox />
    </MainLayout>
  );
}
