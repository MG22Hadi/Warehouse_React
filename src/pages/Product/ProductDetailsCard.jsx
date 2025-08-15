import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

export default function ProductDetailsCard({ id }) {
  const theme = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/products/show/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data.data.product);
    } catch (error) {
      console.error("فشل في جلب تفاصيل المنتج", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <div>جاري تحميل تفاصيل المنتج...</div>;
  if (!product) return <div>تعذر تحميل بيانات المنتج.</div>;

  return (
    <div
      dir="rtl"
      className="rounded-2xl p-8 shadow-xl"
      style={{
        width: "991px",
        height: "548px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* العنوان وصورة المنتج */}
      <div className="flex items-center gap-4 mb-4">
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

      {/* الوصف */}
      <p
        className="text-sm mb-6"
        style={{ color: theme.palette.text.secondary }}
      >
        {product.description || "لا يوجد وصف."}
      </p>

      {/* خط فاصل */}
      <div
        className="w-full h-[1px] mb-6"
        style={{ backgroundColor: theme.palette.divider }}
      ></div>

      {/* جدول التفاصيل */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm rounded-xl overflow-hidden">
          <thead>
            <tr
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              {["الكود", "الكمية", "الوحدة", "السعر", "التاريخ", "الحالة"].map(
                (title, index) => (
                  <th key={index} className="py-3 px-4 text-right font-medium">
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: theme.palette.action.hover,
              }}
            >
              <td
                className="py-3 px-4"
                style={{ color: theme.palette.text.primary }}
              >
                {product.code}
              </td>
              <td
                className="py-3 px-4"
                style={{ color: theme.palette.text.primary }}
              >
                {product.quantity}
              </td>
              <td
                className="py-3 px-4"
                style={{ color: theme.palette.text.primary }}
              >
                {product.unit || "قطعة"}
              </td>
              <td
                className="py-3 px-4"
                style={{ color: theme.palette.text.primary }}
              >
                {product.price} ل.س
              </td>
              <td
                className="py-3 px-4"
                style={{ color: theme.palette.text.primary }}
              >
                {product.created_at}
              </td>
              <td
                className="py-3 px-4"
                style={{ color: theme.palette.text.primary }}
              >
                {product.status === "active" ? "نشط" : "غير نشط"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
