import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MainLayout from "../MainLayout";

export default function Warehouses({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8000/api/warehouses";

  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [formData, setFormData] = useState({ name: "", location: "" });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await api.get(`${BASE_URL}/index`);
      setWarehouses(res.data.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("فشل تحميل المستودعات", error);
    }
  };

  const openAddModal = () => {
    setFormData({ name: "", location: "" });
    setEditingWarehouse(null);
    setShowModal(true);
  };

  const openEditModal = (warehouse) => {
    setFormData({ name: warehouse.name, location: warehouse.location });
    setEditingWarehouse(warehouse);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingWarehouse(null);
  };

  const handleSubmit = async () => {
    console.log("Submitting warehouse...");
    if (!formData.name.trim() || !formData.location.trim()) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    try {
      if (editingWarehouse) {
        await api.put(`${BASE_URL}/update/${editingWarehouse.id}`, formData);
      } else {
        await api.post(`${BASE_URL}/store`, formData);
      }
      fetchWarehouses();
      closeModal();
    } catch (error) {
      console.error("خطأ أثناء حفظ المستودع", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف المستودع؟")) {
      try {
        await api.delete(`${BASE_URL}/destroy/${id}`);
        fetchWarehouses();
      } catch (error) {
        console.error("خطأ أثناء حذف المستودع", error);
      }
    }
  };

  const handleView = (id) => {
    navigate(`/products/warehouse/${id}`);
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="المستودعات">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <div className="flex justify-between items-center mb-10 max-w-[1132px] mx-auto">
          <h1
            className="text-3xl font-bold"
            style={{ color: theme.palette.text.primary }}
          >
            المستودعات
          </h1>
          <button
            onClick={openAddModal}
            className="text-sm font-medium py-2 px-4 rounded-md hover:bg-[#e57d18] transition"
            style={{ backgroundColor: "#FF8E29", color: "#fff" }}
          >
            إضافة مستودع جديد
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1132px] mx-auto">
          {warehouses.map((warehouse, index) => (
            <div
              key={warehouse.id}
              className="w-full min-h-[231px] rounded-2xl shadow-md p-4 flex flex-col justify-between text-right relative transition hover:shadow-lg"
              style={{
                backgroundColor:
                  index % 2 === 0
                    ? theme.palette.background.card1
                    : theme.palette.background.card2,
              }}
            >
              <div className="absolute top-3 left-3 flex gap-2">
                <button
                  onClick={() => openEditModal(warehouse)}
                  title="تعديل"
                  className="text-gray-500 hover:text-orange-500 text-lg"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(warehouse.id)}
                  title="حذف"
                  className="text-gray-500 hover:text-red-500 text-lg"
                >
                  🗑️
                </button>
              </div>

              <div>
                <h2
                  className="text-lg font-bold mb-1"
                  style={{ color: theme.palette.text.primary }}
                >
                  {warehouse.name}
                </h2>
                <p
                  className="text-sm mb-1"
                  style={{ color: theme.palette.text.secondary }}
                >
                  الموقع: {warehouse.location}
                </p>
                <p
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  عدد المنتجات: {warehouse.products_count ?? 0}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleView(warehouse.id)}
                  className="text-sm px-4 py-2 rounded-md bg-[#FF8E29] text-white hover:bg-[#e57d18]"
                >
                  عرض
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-6 text-right">
            <h2 className="text-xl font-bold mb-4">
              {editingWarehouse ? "تعديل المستودع" : "إضافة مستودع جديد"}
            </h2>
            <div className="mb-3">
              <label className="block mb-1 text-sm font-medium">
                اسم المستودع
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">الموقع</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={formData.location}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, location: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                حفظ
              </button>
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
