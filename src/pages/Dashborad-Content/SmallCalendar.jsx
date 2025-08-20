import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTheme } from "@mui/material/styles";
import "./SmallCalendar.css";
import { Link } from "react-router-dom";

export default function SmallCalendar() {
  const [value, setValue] = useState(new Date());
  const theme = useTheme();

  return (
    <div
      className="rounded-2xl shadow-md p-4 mt-6 mx-1 w-[355px] h-min-[456px]"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/calendar"
          className="text-right font-semibold text-lg hover:underline hover:text-orange-500 transition"
          style={{ color: theme.palette.text.primary }}
        >
          التقويم
        </Link>
      </div>

      <div className="calendar-wrapper rtl">
        <Calendar
          onChange={setValue}
          value={value}
          locale="ar-EG"
          className={`!border-none small-calendar ${
            theme.palette.mode === "dark" ? "dark-mode-calendar" : ""
          }`}
          tileClassName="!text-sm"
        />
      </div>
    </div>
  );
}
