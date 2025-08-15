import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

const allProducts = [
  {
    name: "كتاب",
    desc: "الوصف",
    orders: 8000,
    price: "$130",
    warehouse: "000000",
    refunds: "> 13",
  },
  {
    name: "كاميرا",
    desc: "الوصف",
    orders: 3000,
    price: "$45",
    warehouse: "000000",
    refunds: "> 18",
  },
  {
    name: "---",
    desc: "الوصف",
    orders: 6000,
    price: "$80",
    warehouse: "000000",
    refunds: "< 11",
  },
  {
    name: "---",
    desc: "الوصف",
    orders: 4000,
    price: "$500",
    warehouse: "000000",
    refunds: "> 18",
  },
  {
    name: "-----",
    desc: "الوصف",
    orders: 2000,
    price: "$15",
    warehouse: "000000",
    refunds: "< 10",
  },
  {
    name: "جهاز",
    desc: "الوصف",
    orders: 1000,
    price: "$75",
    warehouse: "000000",
    refunds: "> 20",
  },
];

const pageSize = 5;

export default function PastRevenueTable() {
  const theme = useTheme();
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(allProducts.length / pageSize);
  const products = allProducts.slice(page * pageSize, (page + 1) * pageSize);

  const nextPage = () => page < pageCount - 1 && setPage(page + 1);
  const prevPage = () => page > 0 && setPage(page - 1);

  return (
    <div
      className="rounded-2xl shadow-md p-4 mt-6 mx-6 w-[795px] h-min-[622px]"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      <h2
        className="text-right font-semibold text-lg mb-2"
        style={{ color: theme.palette.text.primary }}
      >
        الإيرادات السابقة
      </h2>

      <div
        className="mb-4"
        style={{ height: "1px", backgroundColor: theme.palette.divider }}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-right rtl">
          <thead>
            <tr style={{ color: theme.palette.text.secondary }}>
              <th className="px-4 py-2">المنتج</th>
              <th className="px-4 py-2">الطلبات</th>
              <th className="px-4 py-2">السعر</th>
              <th className="px-4 py-2">المستودع</th>
              <th className="px-4 py-2">المرتجعات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={idx} style={{ color: theme.palette.text.primary }}>
                <td className="px-4 py-2">
                  {p.name}
                  <div className="text-xs text-gray-400">{p.desc}</div>
                </td>
                <td className="px-4 py-2">{p.orders}</td>
                <td className="px-4 py-2">{p.price}</td>
                <td className="px-4 py-2">{p.warehouse}</td>
                <td className="px-4 py-2">{p.refunds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
        <span className="text-xs text-gray-400">
          عرض {products.length} من {allProducts.length} منتج
        </span>

        <div className="flex items-center gap-2 text-sm">
          {/* السابق */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            className={`px-3 py-1 rounded-md transition ${
              page === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-orange-400"
            }`}
          >
            السابق
          </button>

          {/* ترقيم الصفحات */}
          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-8 h-8 rounded-4xl text-center transition ${
                i === page
                  ? "bg-orange-500 text-white"
                  : "text-orange-400 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* التالي */}
          <button
            onClick={nextPage}
            disabled={page >= pageCount - 1}
            className={`px-3 py-1 rounded-md transition ${
              page >= pageCount - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-orange-400"
            }`}
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
