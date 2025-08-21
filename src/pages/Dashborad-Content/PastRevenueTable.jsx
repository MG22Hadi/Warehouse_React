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
    name: "",
    desc: "الوصف",
    orders: 6000,
    price: "$80",
    warehouse: "000000",
    refunds: "< 11",
  },
  {
    name: "",
    desc: "الوصف",
    orders: 4000,
    price: "$500",
    warehouse: "000000",
    refunds: "> 18",
  },
  {
    name: "",
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
  const [page, setPage] = useState(0);
  const theme = useTheme();

  const pageCount = Math.ceil(allProducts.length / pageSize);
  const products = allProducts.slice(page * pageSize, (page + 1) * pageSize);

  const nextPage = () => page < pageCount - 1 && setPage(page + 1);
  const prevPage = () => page > 0 && setPage(page - 1);

  return (
    <div
      className="rounded-2xl shadow-md p-4 mt-1 ml-4 mr-0 flex flex-col items-center"
      style={{
        backgroundColor: theme.palette.background.paper,
        height: "476px",
      }}
    >
      <h2
        className="text-right font-semibold text-lg mb-2 w-full"
        style={{ color: theme.palette.text.primary }}
      >
        الإيرادات السابقة
      </h2>

      <div
        className="mb-4 w-full"
        style={{ height: "1px", backgroundColor: theme.palette.divider }}
      />

      <div className="flex justify-center w-full">
        <table
          className="text-sm text-right rtl h-full border-collapse"
          style={{
            width: "700px",
            tableLayout: "auto",
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <thead>
            <tr style={{ color: theme.palette.text.primary }}>
              <th className="px-4 py-2 border border-gray-200">المنتج</th>
              <th className="px-4 py-2 border border-gray-200">الطلبات</th>
              <th className="px-4 py-2 border border-gray-200">السعر</th>
              <th className="px-4 py-2 border border-gray-200">المستودع</th>
              <th className="px-4 py-2 border border-gray-200">المرتجعات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={idx}
                style={{
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <td
                  className="px-4 py-2"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {p.name}
                  <div
                    className="text-xs"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {p.desc}
                  </div>
                </td>
                <td
                  className="px-4 py-2"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {p.orders}
                </td>
                <td
                  className="px-4 py-2"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {p.price}
                </td>
                <td
                  className="px-4 py-2"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {p.warehouse}
                </td>
                <td
                  className="px-4 py-2"
                  style={{ border: `1px solid ${theme.palette.divider}` }}
                >
                  {p.refunds}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between mt-6 flex-wrap gap-4 w-full">
        <span
          className="text-xs"
          style={{ color: theme.palette.text.secondary, marginTop: "50px" }}
        >
          عرض {products.length} من {allProducts.length} منتج
        </span>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="px-3 py-1 rounded-md transition"
            style={{
              color:
                page === 0
                  ? theme.palette.text.disabled
                  : theme.palette.text.secondary,
              cursor: page === 0 ? "not-allowed" : "pointer",
            }}
          >
            السابق
          </button>

          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="w-8 h-8 rounded-4xl text-center transition"
              style={{
                backgroundColor: i === page ? "#FF8E29" : "transparent",
                color:
                  i === page
                    ? "#FFFFFF"
                    : i === 0
                    ? "#FF8E29"
                    : theme.palette.text.secondary,
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={page >= pageCount - 1}
            className="px-3 py-1 rounded-md transition"
            style={{
              color: "#FF8E29",
              cursor: page >= pageCount - 1 ? "not-allowed" : "pointer",
            }}
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
