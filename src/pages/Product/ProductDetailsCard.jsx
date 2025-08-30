import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { printElementForA4 } from "../.././print/printUtils";
import { BASE_URL } from "../../api/axiosInstance";

export default function ProductDetailsCard({ id }) {
  const theme = useTheme();
  const [printing, setPrinting] = useState(false);
  const [product, setProduct] = useState(null);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // جلب تفاصيل المنتج
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/show/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data.data.product);
    } catch (error) {
      console.error("فشل في جلب تفاصيل المنتج", error);
    }
  };

  // جلب حركة المادة
  const fetchMovements = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product-movements/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMovements(response.data.data || []);
    } catch (error) {
      console.error("فشل في جلب حركة المادة", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProduct(), fetchMovements()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  const handlePrint = () => {
    if (printing) return; // يمنع إعادة الاستدعاء المتكرر
    const card = document.querySelector(
      'div[dir="rtl"].rounded-2xl.p-8.shadow-xl'
    );
    if (!card) {
      alert(
        "لم يتم العثور على بطاقة المنتج بعد. انتظر حتى تُحمَّل البيانات ثم جرّب مرة أخرى."
      );
      return;
    }
    setPrinting(true);
    try {
      printElementForA4(card);
    } finally {
      // نحرّر القفل بعد تأخير بسيط لأن الطباعة تأخذ وقت
      setTimeout(() => setPrinting(false), 1500);
    }
  };

  if (loading) return <div>جاري تحميل تفاصيل المنتج...</div>;
  if (!product) return <div>تعذر تحميل بيانات المنتج.</div>;

  return (
    <div
      dir="rtl"
      className="rounded-2xl p-8 shadow-xl"
      style={{
        width: "1205px",
        minHeight: "548px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* === تعديل بسيط هنا: استخدمت justify-between لوضع الزر في الجهة المقابلة */}
      <div className="flex items-center gap-4 mb-6 justify-between">
        {/* جهة اليمين: الصورة والعنوان (يبقى نفس التصميم) */}
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-md overflow-hidden">
            <img
              src="/assets/Product-icon.png"
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <h2
            className="text-xl font-bold"
            style={{ color: theme.palette.text.primary }}
          >
            {product.name}
          </h2>
        </div>

        {/* جهة اليسار: زر الطباعة (اللي طلبته في الجهة التانية) */}
        <div className="flex items-center mb-4">
          <button
            onClick={handlePrint}
            disabled={printing}
            className="px-4 py-2 rounded bg-orange-400 text-white"
          >
            {printing ? "جاري التحضير..." : "طباعة"}
          </button>
        </div>
      </div>

      {/* مواصفات المنتج بدل الوصف */}
      <div className="mb-6 text-sm grid grid-cols-2 gap-y-3 gap-x-8">
        <p style={{ color: theme.palette.text.secondary }}>
          <strong>الكود :</strong> {product.code}
        </p>
        <p style={{ color: theme.palette.text.secondary }}>
          <strong>الوحدة :</strong> {product.unit || "قطعة"}
        </p>
        <p style={{ color: theme.palette.text.secondary }}>
          <strong>التاريخ :</strong>{" "}
          {new Date(product.created_at).toLocaleDateString("ar-EG")}
        </p>
        <p style={{ color: theme.palette.text.secondary }}>
          <strong>الحالة :</strong>{" "}
          {product.status === "active" ? "نشط" : "غير نشط"}
        </p>
      </div>

      {/* خط فاصل */}
      <div
        className="w-full h-[1px] mb-6"
        style={{ backgroundColor: theme.palette.divider }}
      ></div>

      {/* جدول حركة المادة */}
      <div className="w-full">
        <table className="w-full table-fixed text-sm rounded-xl overflow-hidden">
          <thead>
            <tr
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              {[
                "النوع",
                "الرقم التسلسلي",
                "الكمية السابقة",
                "الكمية الحالية",
                "الكمية بعد التعديل",
                "التاريخ",
                "الملاحظات",
              ].map((title, index) => (
                <th
                  key={index}
                  className="py-3 px-2 text-right font-medium truncate"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movements.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 text-center"
                  style={{ color: theme.palette.text.secondary }}
                >
                  لا يوجد حركات لهذه المادة
                </td>
              </tr>
            ) : (
              movements.map((m) => (
                <tr
                  key={m.id}
                  style={{ backgroundColor: theme.palette.action.hover }}
                >
                  <td
                    className="py-3 px-2 truncate"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    {m.type}
                  </td>
                  <td
                    className="py-3 px-2 truncate"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    {m.reference_serial}
                  </td>
                  <td
                    className="py-3 px-2"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    {m.prv_quantity}
                  </td>
                  <td
                    className="py-3 px-2"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    {m.note_quantity}
                  </td>
                  <td
                    className="py-3 px-2"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    {m.after_quantity}
                  </td>
                  <td
                    className="py-3 px-2 truncate"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    {new Date(m.date).toLocaleDateString("ar-EG")}
                  </td>
                  <td
                    className="py-3 px-2 truncate"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    {m.notes}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
