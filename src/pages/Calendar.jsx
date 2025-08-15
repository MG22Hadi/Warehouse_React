import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";
import MainLayout from "../MainLayout";
import { useTheme } from "@mui/material/styles";
import { Listbox } from "@headlessui/react";
// import "../index.css";

export default function CalendarPage({ mode, toggleTheme }) {
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const theme = useTheme();
  // const dayCellBg = mode === "dark" ? "bg-neutral-900" : "bg-white";

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) setCurrentDate(api.getDate());
  }, []);

  const handleNextMonth = () => {
    const api = calendarRef.current.getApi();
    api.next();
    setCurrentDate(api.getDate());
  };

  const handlePrevMonth = () => {
    const api = calendarRef.current.getApi();
    api.prev();
    setCurrentDate(api.getDate());
  };

  const handleNextDay = () => {
    const api = calendarRef.current.getApi();
    api.incrementDate({ days: 1 });
    setCurrentDate(api.getDate());
  };

  const handlePrevDay = () => {
    const api = calendarRef.current.getApi();
    api.incrementDate({ days: -1 });
    setCurrentDate(api.getDate());
  };

  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value);
    const api = calendarRef.current.getApi();
    const newDate = new Date(currentDate);
    newDate.setMonth(selectedMonth);
    api.gotoDate(newDate);
    setCurrentDate(newDate);
  };

  const monthYearFormatter = new Intl.DateTimeFormat("ar", {
    month: "long",
    year: "numeric",
  });
  const weekdayFormatter = new Intl.DateTimeFormat("ar", { weekday: "long" });

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    name: new Intl.DateTimeFormat("ar", { month: "long" }).format(
      new Date(2025, i)
    ),
  }));

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="التقويم">
      <div
        dir="rtl"
        className="p-6 min-h-screen pt-[18px] rounded-[20px]"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <div className="flex items-center justify-between mb-4">
          {/* الشهر + أسهم */}
          <div
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: theme.palette.text.primary }}
          >
            <span>{monthYearFormatter.format(currentDate)}</span>
            <button
              onClick={handlePrevMonth}
              className="w-[19.17px] h-[19.17px]"
            >
              <img
                src="/assets/icons-dashboard/right-arrow-month.png"
                className="w-full h-full object-cover object-bottom"
              />
            </button>
            <button
              onClick={handleNextMonth}
              className="w-[19.17px] h-[19.17px]"
            >
              <img
                src="/assets/icons-dashboard/right-arrow-month.png"
                className="w-full h-full object-cover object-bottom rotate-180"
              />
            </button>
          </div>

          {/* اليوم السابق/التالي */}
          <div
            className="flex items-center gap-4 text-sm font-medium"
            style={{ color: theme.palette.text.primary }}
          >
            <button onClick={handlePrevDay} className="w-[8.75px] h-[14px]">
              <img
                src="/assets/icons-dashboard/right-arrow.png"
                className="w-full h-full object-cover object-bottom"
              />
            </button>
            <div>{weekdayFormatter.format(currentDate)}</div>
            <button onClick={handleNextDay} className="w-[8.75px] h-[14px]">
              <img
                src="/assets/icons-dashboard/left-arrow.png"
                className="w-full h-full object-cover object-bottom"
              />
            </button>
          </div>

          {/* تحديد الشهر */}
          <div className="relative w-[170px] h-[45px]">
            <Listbox
              value={currentDate.getMonth()}
              onChange={(selectedMonth) => {
                const api = calendarRef.current.getApi();
                const newDate = new Date(currentDate);
                newDate.setMonth(selectedMonth);
                api.gotoDate(newDate);
                setCurrentDate(newDate);
              }}
            >
              <div className="relative">
                <Listbox.Button className="w-full h-[45px] text-sm text-center rounded-[30px] px-4 pr-8 bg-[#FF8E29] text-white border-none focus:outline-none relative scr">
                  {months[currentDate.getMonth()].name}
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Listbox.Options
                  className="absolute w-full mt-0 max-h-60 overflow-auto rounded-[20px] bg-[#FF8E29] text-white shadow-lg z-10 text-center scrollbar-hide"
                  style={{ overflowY: "auto", scrollbarWidth: "none" }}
                >
                  {months.map((month, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={month.value}
                      className={({ active }) =>
                        `cursor-pointer select-none py-2 ${
                          active ? "bg-orange-300" : ""
                        }`
                      }
                    >
                      {month.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        <div
          className="rounded-[20px] shadow p-4"
          style={{ backgroundColor: theme.palette.background.calender }}
        >
          {/* التقويم */}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={arLocale}
            direction="rtl"
            headerToolbar={true}
            views={{
              dayGridMonth: { titleFormat: { year: "numeric", month: "long" } },
            }}
            dayHeaderFormat={{ weekday: "short" }}
            dayCellContent={(arg) => {
              const date = arg.date;
              const isToday = new Date().toDateString() === date.toDateString();
              const isFocused =
                currentDate.toDateString() === date.toDateString();
              return (
                <div
                  className={`relative text-right text-xs px-1 w-full h-full flex items-start justify-end pr-2 pt-1 font-bold ${
                    isFocused ? "text-[#FF8E29]" : "text-[inherit]"
                  }`}
                  style={{
                    color: isFocused ? "#FF8E29" : theme.palette.text.primary,
                  }}
                >
                  {isToday && (
                    <div
                      className="absolute top-1 right-1 w-5 h-5 rounded-full opacity-20 z-0"
                      style={{ backgroundColor: "#FF8E29" }}
                    ></div>
                  )}
                  <span className="relative z-10">{arg.dayNumberText}</span>
                </div>
              );
            }}
            dayCellClassNames={(arg) => {
              const isToday =
                new Date().toDateString() === arg.date.toDateString();
              return [
                "rounded-xl",
                "shadow-sm",
                "p-1",
                "text-sm",
                "min-h-[60px]",
                mode === "dark" ? "bg-[#151D32]" : "bg-white",
                isToday && "!bg-opacity-70",
              ]
                .filter(Boolean)
                .join(" ");
            }}
            events={[
              {
                title: "مهمة مستودع",
                date: "2025-05-15",
                backgroundColor: "#FDBA74",
                textColor: "#7C2D12",
              },
              {
                title: "تسليم مهم",
                date: "2025-05-20",
                backgroundColor: "#93C5FD",
                textColor: "#1E3A8A",
              },
            ]}
          />
        </div>
      </div>
    </MainLayout>
  );
}
