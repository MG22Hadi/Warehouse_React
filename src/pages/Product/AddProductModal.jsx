import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/axiosInstance";

export default function AddProductModal({ onClose, onSuccess, warehouseId }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    unit: "",
    consumable: false,
    notes: "",
    warehouse_id: warehouseId || "", // من رابط URL
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/products/store`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSuccess(res.data.data.product); // رجّع المنتج الجديد
      onClose();
    } catch (err) {
      console.error("فشل في إنشاء المنتج", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-[400px] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center">إضافة منتج جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="اسم المنتج"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="code"
            placeholder="الكود"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="unit"
            placeholder="الوحدة (مثلاً: علبة)"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <textarea
            name="notes"
            placeholder="ملاحظات"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="consumable" onChange={handleChange} />
            <span>قابل للاستهلاك</span>
          </label>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded"
          >
            حفظ
          </button>
        </form>
      </div>
    </div>
  );
}
