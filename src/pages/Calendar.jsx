import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";
import MainLayout from "../MainLayout";
import { useTheme } from "@mui/material/styles";
import { Listbox } from "@headlessui/react";
import api from "../api/axiosInstance";
import "../index.css";

export default function CalendarPage({ mode, toggleTheme }) {
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const theme = useTheme();

  // ====== API & STATE ======
  const BASE_URL = "http://localhost:8000/api/calendar";

  const [events, setEvents] = useState([]); // ملاحظات الشهر الحالي (معالجة لـ FullCalendar)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // نافذة الإضافة/التعديل/الحذف
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // YYYY-MM-DD
  const [noteContent, setNoteContent] = useState("");
  const [hasExistingNote, setHasExistingNote] = useState(false); // لتمييز بين إضافة/تعديل

  // ====== Helpers ======
  const two = (n) => String(n).padStart(2, "0");
  const ymd = (d) =>
    `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`;

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

  // ====== Fetch notes for visible month ======
  const fetchNotesByMonthYear = async (dateObj) => {
    setLoading(true);
    setError("");

    const month = two(dateObj.getMonth() + 1);
    const year = String(dateObj.getFullYear());

    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const notes = res?.data?.data?.notes ?? [];
      const mapped = notes.map((n) => ({
        title: n.noteContent,
        date: n.note_date,
        backgroundColor: "#FFEDD5",
        textColor: theme.palette?.text?.primary || "#111827",
        borderColor: "transparent",
      }));

      setEvents(mapped);
    } catch (err) {
      console.error("فشل جلب ملاحظات التقويم", err);
      setError("فشل جلب ملاحظات التقويم");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // جلب عند التحميل وأي تغيير للشهر/السنة
  useEffect(() => {
    fetchNotesByMonthYear(currentDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate.getFullYear(), currentDate.getMonth()]);

  // ====== Calendar navigation handlers (كما هي) ======
  useEffect(() => {
    const apiFC = calendarRef.current?.getApi();
    if (apiFC) setCurrentDate(apiFC.getDate());
  }, []);

  const handleNextMonth = () => {
    const apiFC = calendarRef.current.getApi();
    apiFC.next();
    setCurrentDate(apiFC.getDate());
  };

  const handlePrevMonth = () => {
    const apiFC = calendarRef.current.getApi();
    apiFC.prev();
    setCurrentDate(apiFC.getDate());
  };

  const handleNextDay = () => {
    const apiFC = calendarRef.current.getApi();
    apiFC.incrementDate({ days: 1 });
    setCurrentDate(apiFC.getDate());
  };

  const handlePrevDay = () => {
    const apiFC = calendarRef.current.getApi();
    apiFC.incrementDate({ days: -1 });
    setCurrentDate(apiFC.getDate());
  };

  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value);
    const apiFC = calendarRef.current.getApi();
    const newDate = new Date(currentDate);
    newDate.setMonth(selectedMonth);
    apiFC.gotoDate(newDate);
    setCurrentDate(newDate);
  };

  // ====== Modal open logic on date click ======
  const openModalForDate = (dateStr) => {
    setSelectedDate(dateStr);
    const existing = events.find((e) => e.date === dateStr);
    if (existing) {
      setHasExistingNote(true);
      setNoteContent(existing.title || "");
    } else {
      setHasExistingNote(false);
      setNoteContent("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
    setNoteContent("");
    setHasExistingNote(false);
  };

  // ====== CRUD Handlers ======
  const handleSave = async () => {
    try {
      const payload = {
        noteContent: noteContent,
        note_date: selectedDate,
      };

      console.log("📤 البيانات المرسلة:", payload);

      const res = await api.post(`${BASE_URL}/store`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("تم الحفظ بنجاح:", res.data);
      alert("تم الحفظ بنجاح");
    } catch (err) {
      console.error("خطأ أثناء الحفظ:", err);

      if (err.response) {
        console.error("📩 رد السيرفر:", err.response.data);
        alert(
          `خطأ من السيرفر: ${err.response.status} - ${JSON.stringify(
            err.response.data
          )}`
        );
      } else if (err.request) {
        console.error("📡 لم يتم الرد من السيرفر");
        alert("لم يتم الرد من السيرفر");
      } else {
        console.error("خطأ غير متوقع:", err.message);
        alert(`خطأ غير متوقع: ${err.message}`);
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedDate) return;
    if (!window.confirm("هل أنت متأكد من حذف الملاحظة؟")) return;

    try {
      await api.delete(`${BASE_URL}/destroy/${selectedDate}`);
      await fetchNotesByMonthYear(new Date(selectedDate));
      closeModal();
    } catch (err) {
      console.error("خطأ أثناء حذف الملاحظة", err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

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
                alt=""
              />
            </button>
            <button
              onClick={handleNextMonth}
              className="w-[19.17px] h-[19.17px]"
            >
              <img
                src="/assets/icons-dashboard/right-arrow-month.png"
                className="w-full h-full object-cover object-bottom rotate-180"
                alt=""
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
                alt=""
              />
            </button>
            <div>{weekdayFormatter.format(currentDate)}</div>
            <button onClick={handleNextDay} className="w-[8.75px] h-[14px]">
              <img
                src="/assets/icons-dashboard/left-arrow.png"
                className="w-full h-full object-cover object-bottom"
                alt=""
              />
            </button>
          </div>

          {/* تحديد الشهر */}
          <div className="relative w-[170px] h-[45px]">
            <Listbox
              value={currentDate.getMonth()}
              onChange={(selectedMonth) => {
                const apiFC = calendarRef.current.getApi();
                const newDate = new Date(currentDate);
                newDate.setMonth(selectedMonth);
                apiFC.gotoDate(newDate);
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
            //  فتح المودال عند الضغط على اليوم
            dateClick={(arg) => {
              // arg.dateStr بصيغة YYYY-MM-DD
              openModalForDate(arg.dateStr);
            }}
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
            //  استخدام الملاحظات القادمة من الـ API
            events={events}
          />
          {loading && (
            <div
              className="mt-3 text-sm"
              style={{ color: theme.palette.text.secondary }}
            >
              جاري تحميل ملاحظات الشهر...
            </div>
          )}
          {!!error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>
      </div>

      {/* ===== Modal (إضافة/تعديل/حذف) بنفس روح صفحة المستودعات ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="w-[90%] max-w-md rounded-xl p-6 text-right"
            style={{
              backgroundColor:
                theme.palette.mode === "dark" ? "#1f2937" : "#ffffff",
            }}
          >
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: theme.palette.text.primary }}
            >
              {hasExistingNote ? "تعديل ملاحظة" : "إضافة ملاحظة"}
            </h2>
            <p
              className="text-sm mb-4"
              style={{ color: theme.palette.text.secondary }}
            >
              التاريخ: {selectedDate}
            </p>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                نص الملاحظة
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-[110px]"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-between mt-4">
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  حفظ
                </button>
                {hasExistingNote && (
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    حذف
                  </button>
                )}
              </div>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
