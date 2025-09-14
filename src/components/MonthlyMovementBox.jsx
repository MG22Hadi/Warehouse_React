import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/axiosInstance";

const MonthlyMovement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams(); // يحاول يقرأ :id أو :warehouseId من الراوتر
  const location = useLocation();

  // ======= الحالة =======
  const [warehouseId, setWarehouseId] = useState(() => {
    // محاولة قراءة id من useParams
    const possible =
      params.warehouseId ?? params.id ?? params.warehouse_id ?? params.wid;
    if (possible) return Number(possible);

    // محاولة قراءة من query string ?warehouse=1
    const q = new URLSearchParams(window.location.search).get("warehouse");
    if (q) return Number(q);

    // محاولة استخراج /warehouses/1/ أو آخر رقم في المسار
    const path = window.location.pathname;
    const m1 = path.match(/\/warehouses\/(\d+)/i);
    if (m1) return Number(m1[1]);
    const m2 = path.match(/\/(\d+)(?:\/?$)/);
    if (m2) return Number(m2[1]);

    // افتراضي: null => لن يجري الطلب حتى يتوفر id
    return null;
  });

  const [warehouseName, setWarehouseName] = useState("اسم المستودع");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);

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

  // ======= دالة جلب الأرصدة (GET + query params) =======
  const fetchData = async (wId = warehouseId, y = year, m = month) => {
    if (!wId) {
      setError("معرّف المستودع غير متوفر في رابط الصفحة.");
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);
    setValidationErrors(null);

    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/warehouses/${wId}/product-balances`;

    try {
      const res = await axios.get(url, {
        params: { year: Number(y), month: Number(m) },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // نتعامل بصيغة مرنة مع الحقول
      const items = res.data?.data ?? [];
      setData(items);

      // إذا الـ API أعطانا اسم المستودع نعرضه — وإلا نعرض "المستودع {id}"
      if (res.data?.warehouse_name) setWarehouseName(res.data.warehouse_name);
      else setWarehouseName(`المستودع ${wId}`);
    } catch (err) {
      console.error("خطأ جلب الأرصدة:", err);
      const resp = err?.response?.data;
      if (resp?.errors) {
        setValidationErrors(resp.errors);
        setError(resp.message ?? "بيانات غير صالحة");
      } else if (err?.response?.status === 405) {
        setError(
          "الطريقة غير مسموحة على المسار — يجب إرسال year و month كـ query params (GET)."
        );
      } else if (err?.response?.status === 422) {
        setError(
          "مطلوب year و month. تأكد من إرسالهما في الاستعلام (?year=YYYY&month=M)."
        );
      } else {
        setError(
          "فشل في جلب بيانات الحركة. تحقق من الاتصال وحقوق الوصول (token/CORS)."
        );
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // جلب تلقائي عند تغيّر الـ id أو الشهر/السنة
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseId, month, year]);

  const handlePrint = () => window.print();

  // عند الضغط عالصف ننقلك لصف المنتج — عدّل المسار لو لازم
  const handleRowClick = (productId) => {
    if (!productId) return;
    // تمرير warehouse في الاستعلام عشان الصفحة الوجهة تعرف أي مستودع
    navigate(`/products/${productId}?warehouse=${warehouseId}`);
  };

  // ======= إجماليات (مرن مع أسماء الحقول المختلفة) =======
  const totals = data.reduce(
    (acc, it) => {
      const opening = Number(
        it.opening_balance ?? it.start_qty ?? it.opening ?? 0
      );
      const entries = Number(it.total_entries ?? it.entries ?? it.in ?? 0);
      const exits = Number(it.total_exits ?? it.exits ?? it.out ?? 0);
      const closing = Number(
        it.closing_balance ??
          it.end_qty ??
          it.closing ??
          opening + entries - exits
      );
      acc.opening += opening;
      acc.entries += entries;
      acc.exits += exits;
      acc.closing += closing;
      return acc;
    },
    { opening: 0, entries: 0, exits: 0, closing: 0 }
  );

  // ======= JSX (تصميمك محفوظ، مع رسائل خطأ/تحميل) =======
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
        {/* اسم المستودع */}
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
            {/* أضفت نطاق سنوات مرن — عدّل أو سوّي ديناميكي لو تحب */}
            {[2023, 2024, 2025, 2026].map((y) => (
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

      {/* رسائل الخطأ/التحقق */}
      {validationErrors && (
        <div className="mb-3 text-sm text-red-600">
          {Object.entries(validationErrors).map(([k, arr]) => (
            <div key={k}>
              <strong>{k}:</strong> {arr.join(", ")}
            </div>
          ))}
        </div>
      )}

      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

      {/* ستايل للطباعة فقط الجدول */}
      <style>{`
  @media print {
    body * { visibility: hidden !important; }
    .print-table, .print-table * { visibility: visible !important; }
    .print-table {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      background: white !important;
      color: black !important;
      box-shadow: none !important;
      font-size: 11px; /* خط أصغر */
      transform: scale(0.9); /* نصغّر الجدول شوي لي fits الصفحة */
      transform-origin: top center; /* يظل محاذي من اليمين */
    }

    /* إخفاء عناصر التحكم (القوائم و الأزرار) */
    select, button { display: none !important; }

    /* حدود واضحة */
    table, th, td {
      border: 1px solid #000 !important;
      border-collapse: collapse;
      width: 100% !important;
      table-layout: fixed !important; /* يجبر الأعمدة تنضغط */
    }

    th, td {
      padding: 3px 4px !important;
      white-space: normal !important;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* عمود الوحدة */
    th:nth-child(7), td:nth-child(7) {
      min-width: 70px !important;
      max-width: 100px !important;
    }

    /* نصغّر عمود رمز المادة */
    th:nth-child(2), td:nth-child(2) {
      width: 70px !important;
    }

    /* الهيدر الخاص بالطباعة */
    .print-header {
      display: block !important;
      text-align: center;
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: bold;
    }

    @page {
      size: A4 landscape; /* عرضية */
      margin: 10mm;
    }
  }

  /* بالعرض العادي ما يظهر الهيدر */
  .print-header { display: none; }
`}</style>

      {/* جدول داخل حاوية قابلة للتمرير أفقياً */}
      <div
        className="table-wrapper rounded-[20px] shadow p-4 print-table overflow-x-auto"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <div className="print-header">
          حركة المستودع: {warehouseName} <br />
          للشهر: {months[month - 1]} {year} <br />
          تاريخ الطباعة: {new Date().toLocaleDateString("ar-SY")}
        </div>

        {loading ? (
          <div className="py-6 text-center">جاري التحميل...</div>
        ) : (
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
                <tr style={{ backgroundColor: theme.palette.background.note1 }}>
                  <td colSpan={7} className="py-6 text-gray-500">
                    لا توجد بيانات لهذا الشهر
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => {
                  // نقرأ الحقول بشكل مرن (يتوافق مع الأمثلة اللي عطيتنا)
                  const productName =
                    item.product_name ?? item.name ?? item.product?.name ?? "-";
                  const productCode =
                    item.product_code ?? item.code ?? item.product?.code ?? "-";
                  const opening =
                    item.opening_balance ?? item.start_qty ?? item.opening ?? 0;
                  const entries =
                    item.total_entries ?? item.entries ?? item.in ?? 0;
                  const exits = item.total_exits ?? item.exits ?? item.out ?? 0;
                  const closing =
                    item.closing_balance ??
                    item.end_qty ??
                    item.closing ??
                    opening + entries - exits;
                  const unit =
                    item.unit ?? item.product_unit ?? item.product?.unit ?? "-";

                  return (
                    <tr
                      key={item.product_id ?? idx}
                      onClick={() =>
                        handleRowClick(item.product_id ?? item.product?.id)
                      }
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          idx % 2 === 0
                            ? theme.palette.background.note1
                            : theme.palette.background.note2,
                      }}
                      title="اضغط لفتح صفحة المنتج"
                    >
                      <td className="py-2 px-2">{productName}</td>
                      <td className="py-2 px-2">{productCode}</td>
                      <td className="py-2 px-2">{opening}</td>
                      <td className="py-2 px-2">{entries}</td>
                      <td className="py-2 px-2">{exits}</td>
                      <td className="py-2 px-2">{closing}</td>
                      <td className="py-2 px-2">{unit}</td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {/* تذييل الإجماليات */}
            {data.length > 0 && (
              <tfoot>
                <tr style={{ borderTop: "2px solid rgba(0,0,0,0.08)" }}>
                  <td className="py-2 px-2 font-semibold">الإجمالي</td>
                  <td />
                  <td className="py-2 px-2 font-semibold">{totals.opening}</td>
                  <td className="py-2 px-2 font-semibold">{totals.entries}</td>
                  <td className="py-2 px-2 font-semibold">{totals.exits}</td>
                  <td className="py-2 px-2 font-semibold">{totals.closing}</td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        )}
      </div>
    </div>
  );
};

export default MonthlyMovement;
