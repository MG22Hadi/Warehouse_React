import React from "react";
import MainLayout from "../MainLayout";
import NotificationBox from "../components/NotificationBox";

export default function Notification({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="الاشعارات">
      <NotificationBox />
    </MainLayout>
  );
}
