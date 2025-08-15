import React from "react";
import MainLayout from "../MainLayout";
import NotificationBox from "../components/NotificationBox"; // حسب مسار المشروع

export default function Notification({ mode, toggleTheme }) {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="الاشعارات">
      <NotificationBox />
    </MainLayout>
  );
}
