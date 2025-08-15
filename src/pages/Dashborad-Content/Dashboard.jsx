import React from "react";
import RevenueChart from "./RevenueChart";
import DashboardSummary from "./DashboardSummary";
import SmallCalendar from "./SmallCalendar";
import PastRevenueTable from "./PastRevenueTable";
import PastRevenueChart from "./PastRevenueChart";
import MainLayout from "../../MainLayout";

export default function Dashboard({ mode, toggleTheme }) {
  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="الصفحة الرئيسية"
    >
      <div className="flex-1 overflow-y-auto p-6 text-right">
        <div className="flex flex-col space-y-6">
          <DashboardSummary />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <SmallCalendar />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <PastRevenueTable />
            </div>
            <PastRevenueChart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
