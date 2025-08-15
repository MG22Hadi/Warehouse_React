import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useTheme } from "@mui/material/styles";

ChartJS.register(ArcElement, Tooltip);

export default function PastRevenueChart() {
  const theme = useTheme();

  const labels = ["كتب", "كاميرات", "أجهزة", "إلكترونيات"];
  const dataValues = [43, 27, 16, 33];
  const colors = ["#0F766E", "#2563EB", "#8B5CF6", "#FF8E29"];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className="rounded-2xl shadow-md p-4 mt-6 mx-6 w-[357px] h-min-[460px]"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      <h2
        className="text-right font-semibold text-lg mb-4"
        style={{ color: theme.palette.text.primary }}
      >
        الإيرادات السابقة
      </h2>

      <div className="flex flex-col items-center">
        <Doughnut data={data} options={options} />

        <div className="text-center mt-4">
          <p
            className="text-2xl font-bold"
            style={{ color: theme.palette.text.primary }}
          >
            18K
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 w-full px-4">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: colors[index] }}
              />
              <span
                className="text-sm"
                style={{ color: theme.palette.text.primary }}
              >
                {label} ({dataValues[index]})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
