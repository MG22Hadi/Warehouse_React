import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

export default function ProductDetailsCard({ id }) {
  const theme = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data.data.product); // Laravel returns product inside `data.product`
    } catch (error) {
      console.error("فشل في جلب تفاصيل المنتج", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl w-[991px] h-[548px] text-center flex items-center justify-center shadow-lg">
        جاري تحميل تفاصيل المنتج...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white p-6 rounded-xl w-[991px] h-[548px] text-center flex items-center justify-center shadow-lg">
        تعذر تحميل بيانات المنتج.
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl p-8 shadow-xl"
      style={{ width: "991px", height: "548px" }}
      dir="rtl"
    >
      {/* 🧱 صورة واسم المنتج */}
      <div className="flex items-center gap-4 mb-6">
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

      {/* 📝 الوصف */}
      <p
        className="text-sm mb-4"
        style={{ color: theme.palette.text.secondary }}
      >
        {product.description || "لا يوجد وصف."}
      </p>

      {/* 📋 جدول التفاصيل */}
      <div className="w-full overflow-x-auto mt-6">
        <table className="w-full text-sm rounded-t-xl overflow-hidden">
          <thead>
            <tr className="bg-[#FF8E29] text-white">
              <th className="py-3 px-4 text-right">الكود</th>
              <th className="py-3 px-4 text-right">الكمية</th>
              <th className="py-3 px-4 text-right">الوحدة</th>
              <th className="py-3 px-4 text-right">السعر</th>
              <th className="py-3 px-4 text-right">التاريخ</th>
              <th className="py-3 px-4 text-right">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {/* تمثيل بيانات افتراضية أو من المنتج */}
            <tr className="bg-[#FFF1E7]">
              <td className="py-3 px-4">{product.code}</td>
              <td className="py-3 px-4">{product.quantity}</td>
              <td className="py-3 px-4">{product.unit || "قطعة"}</td>
              <td className="py-3 px-4">{product.price} ر.س</td>
              <td className="py-3 px-4">{product.created_at}</td>
              <td className="py-3 px-4">
                {product.status === "active" ? "نشط" : "غير نشط"}
              </td>
            </tr>
            {/* يمكن تكرار الصفوف إذا أردت عرض سجلات سابقة لاحقًا */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
