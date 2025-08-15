import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const FILTER_OPTIONS = [
  { key: "name", label: "اسم المنتج", type: "text" },
  { key: "code", label: "كود المنتج", type: "text" },
  { key: "unit", label: "الوحدة", type: "text" },
  {
    key: "consumable",
    label: "قابل للاستهلاك",
    type: "select",
    options: ["نعم", "لا"],
  },
  { key: "from", label: "من تاريخ", type: "date" },
  { key: "to", label: "إلى تاريخ", type: "date" },
];

export default function FilterBar({ onFilter }) {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(true);

  // تطبيق الفلترة مباشرة عند التغيير
  useEffect(() => {
    const validFilters = {};
    for (const key in filters) {
      if (filters[key]?.toString().trim()) {
        validFilters[key] = filters[key];
      }
    }
    onFilter(validFilters);
  }, [filters]);

  const handleChange = (e, key) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setActiveFilter(null);
    setFilters({});
  };

  const selectedColor = theme.palette.primary.main;
  const backgroundColor = theme.palette.background.paper;
  const textColor = theme.palette.text.primary;
  const borderColor = theme.palette.divider;

  return (
    <div
      className="p-4 rounded-lg shadow mb-6 max-w-[1132px] mx-auto"
      style={{ backgroundColor }}
      dir="rtl"
    >
      {/* زر إظهار/إخفاء الفلاتر */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-lg" style={{ color: textColor }}>
          + إضافة فلتر
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="text-sm px-3 py-1 rounded"
          style={{
            backgroundColor: theme.palette.action.selected,
            color: selectedColor,
          }}
        >
          {showFilters ? "إخفاء الفلاتر" : "إظهار الفلاتر"}
        </button>
      </div>

      {/* قسم الفلاتر */}
      {showFilters && (
        <>
          {/* أزرار اختيار فلتر واحد */}
          <div className="flex flex-wrap gap-4 mb-4">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter.key}
                onClick={() =>
                  setActiveFilter((prev) =>
                    prev === filter.key ? null : filter.key
                  )
                }
                className="flex items-center gap-2 text-sm border px-3 py-1 rounded-full transition"
                style={{
                  borderColor:
                    activeFilter === filter.key ? selectedColor : borderColor,
                  backgroundColor:
                    activeFilter === filter.key
                      ? theme.palette.action.selected
                      : "transparent",
                  color:
                    activeFilter === filter.key
                      ? selectedColor
                      : theme.palette.text.secondary,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full border"
                  style={{
                    borderColor: selectedColor,
                    backgroundColor:
                      activeFilter === filter.key
                        ? selectedColor
                        : "transparent",
                  }}
                ></span>
                {filter.label}
              </button>
            ))}
          </div>

          {/* الحقل النشط فقط */}
          <div className="flex flex-wrap gap-4 mb-4 items-end">
            {activeFilter && (
              <div className="flex flex-col">
                <label className="text-sm mb-1" style={{ color: textColor }}>
                  {FILTER_OPTIONS.find((f) => f.key === activeFilter)?.label}
                </label>
                {FILTER_OPTIONS.find((f) => f.key === activeFilter)?.type ===
                "select" ? (
                  <select
                    value={filters[activeFilter] || ""}
                    onChange={(e) => handleChange(e, activeFilter)}
                    className="p-2 rounded focus:outline-none"
                    style={{
                      borderColor: borderColor,
                      backgroundColor: theme.palette.background.default,
                      color: textColor,
                    }}
                  >
                    <option value="">الكل</option>
                    {FILTER_OPTIONS.find(
                      (f) => f.key === activeFilter
                    ).options.map((val) => (
                      <option
                        key={val}
                        value={val === "نعم" ? "true" : "false"}
                      >
                        {val}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={
                      FILTER_OPTIONS.find((f) => f.key === activeFilter).type
                    }
                    value={filters[activeFilter] || ""}
                    onChange={(e) => handleChange(e, activeFilter)}
                    className="p-2 rounded focus:outline-none"
                    style={{
                      borderColor: borderColor,
                      backgroundColor: theme.palette.background.default,
                      color: textColor,
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* زر مسح الكل */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded transition"
              style={{
                backgroundColor: theme.palette.action.selected,
                color: selectedColor,
              }}
            >
              مسح الكل
            </button>
          </div>
        </>
      )}
    </div>
  );
}
