import React from "react";
import { useTheme } from "@mui/material/styles";

const summaryCards = [
  {
    title: "المبيعات",
    value: "٢٣٠,٢٢٠ ل.س",
    icon: "/assets/icons-dashboard/Sales.png",
    iconBg: "#FF8E29",
  },
  {
    title: "العملاء",
    value: "٣٢٠٠",
    icon: "/assets/icons-dashboard/Customers.png",
    iconBg: "#0F766E",
  },
  {
    title: "متوسط الإيراد",
    value: "٣٢٠٠ ل.س",
    icon: "/assets/icons-dashboard/Avg-Revenue.png",
    iconBg: "#2563EB",
  },
];


export default function DashboardSummary() {
  const theme = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {summaryCards.map((card, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 rounded-2xl shadow-md"
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* النص */}
          <div className="text-right flex-1 pr-4">
            <p
              className="text-sm font-medium"
              style={{ color: theme.palette.text.secondary }}
            >
              {card.title}
            </p>
            <p
              className="text-lg font-bold mt-1"
              style={{ color: theme.palette.text.primary }}
            >
              {card.value}
            </p>
            <p className="text-xs text-orange-400 mt-2">+20% الشهر الماضي</p>
          </div>

          {/* الأيقونة */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: card.iconBg }}
          >
            <img
              src={card.icon}
              alt={card.title}
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
