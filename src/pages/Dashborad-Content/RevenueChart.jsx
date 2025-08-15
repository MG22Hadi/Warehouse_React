import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const chartData = (theme) => ({
  labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
  datasets: [
    {
      label: "الإيرادات",
      data: [12000, 15000, 11000, 18000, 20000, 17000],
      borderColor: "#FF8E29",
      backgroundColor: "rgba(255, 142, 41, 0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#FF8E29",
    },
  ],
});

const chartOptions = (theme) => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.palette.text.primary,
        callback: (value) => `${value} ل.س`,
      },
      grid: {
        color: theme.palette.divider,
      },
    },
    x: {
      ticks: {
        color: theme.palette.text.primary,
      },
      grid: {
        color: theme.palette.divider,
      },
    },
  },
});

export default function RevenueChart() {
  const theme = useTheme();

  return (
    <div
      className="rounded-2xl shadow-md p-4 mt-6 mx-6 w-[795px] h-min-[460px]"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      <h2
        className="text-right font-semibold text-lg mb-4"
        style={{ color: theme.palette.text.primary }}
      >
        الإيرادات خلال الأشهر
      </h2>
      <Line data={chartData(theme)} options={chartOptions(theme)} />
    </div>
  );
}
