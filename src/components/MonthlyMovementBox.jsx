import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { BASE_URL } from "../api/axiosInstance";

const MonthlyMovement = () => {
  const theme = useTheme();
  const [warehouseName, setWarehouseName] = useState("اسم المستودع");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const months = [
    "1 كانون الثاني",
    "2 شباط",
    "3 آذار",
    "4 نيسان",
    "5 أيار",
    "6 حزيران",
    "7 تموز",
    "8 آب",
    "9 أيلول",
    "10 تشرين الأول",
    "11 تشرين الثاني",
    "12 كانون الأول",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${BASE_URL}/monthly-movement?month=${month}&year=${year}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(res.data?.data || []);
        setWarehouseName(res.data?.warehouse_name || "اسم المستودع");
      } catch (err) {
        setData([]);
      }
    };
    fetchData();
  }, [month, year]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="p-6 rounded-[20px] min-h-screen"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
      dir="rtl"
    >
      {/* Header: responsive — on small screens items stack, on md+ they are on one row with space-between */}
      <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-4 mb-6">
        {/* اسم المستودع — الآن في DOM قبل الأزرار (فـ على md يكون في الجهة المقابلة) */}
        <div className="text-lg font-bold text-[#FF8E29] truncate">
          {warehouseName}
        </div>

        {/* Controls (اختيار الشهر/السنة/طباعة) */}
        <div className="flex flex-wrap items-center gap-3 justify-start md:justify-end">
          <select
            className="rounded-xl px-4 py-2 bg-[#FF8E29] text-white font-bold focus:outline-none min-w-[140px]"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            dir="rtl"
            aria-label="اختر الشهر"
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx + 1}>
                {m}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl px-4 py-2 bg-[#FF8E29] text-white font-bold focus:outline-none min-w-[100px]"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            dir="rtl"
            aria-label="اختر السنة"
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <button
            className="rounded-xl px-4 py-2 bg-[#FF8E29] text-white font-bold shadow hover:bg-orange-400 transition-all"
            onClick={handlePrint}
            aria-label="طباعة"
          >
            طباعة
          </button>
        </div>
      </div>

      {/* ستايل للطباعة فقط الجدول */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .print-table, .print-table * { visibility: visible !important; }
          .print-table { position: absolute; top: 0; left: 0; width: 100vw; background: white !important; color: black !important; box-shadow: none !important; }
        }
      `}</style>

      {/* جدول داخل حاوية قابلة للتمرير أفقياً */}
      <div
        className="table-wrapper rounded-[20px] shadow p-4 print-table overflow-x-auto"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <table className="w-full text-center border-collapse min-w-[900px]">
          <thead>
            <tr style={{ backgroundColor: theme.palette.background.note1 }}>
              <th className="py-3 px-2">المادة</th>
              <th className="py-3 px-2">رمز المادة</th>
              <th className="py-3 px-2">الكمية أول الشهر</th>
              <th className="py-3 px-2">الادخالات ضمن الشهر</th>
              <th className="py-3 px-2">الاخراجات ضمن الشهر</th>
              <th className="py-3 px-2">الكمية آخر الشهر</th>
              <th className="py-3 px-2">الوحدة</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-gray-500">
                  لا توجد بيانات لهذا الشهر
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor:
                      idx % 2 === 0
                        ? theme.palette.background.note1
                        : theme.palette.background.note2,
                  }}
                >
                  <td className="py-2 px-2">{item.product_name}</td>
                  <td className="py-2 px-2">{item.code}</td>
                  <td className="py-2 px-2">{item.start_qty}</td>
                  <td className="py-2 px-2">{item.entries}</td>
                  <td className="py-2 px-2">{item.exits}</td>
                  <td className="py-2 px-2">{item.end_qty}</td>
                  <td className="py-2 px-2">
                    {item.unit ?? item.product_unit ?? "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyMovement;
