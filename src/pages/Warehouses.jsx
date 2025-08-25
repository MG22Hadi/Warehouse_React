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
  const [showModal1, setShowModal1] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [showModal, setShowModal] = useState(false);

  // بيانات الأقسام (مبدئياً static)
  const [sections, setSections] = useState([
    { id: 1, name: "قسم المشتريات", manager: "أحمد علي", description: "إدارة عمليات الشراء والتوريد." },
    { id: 2, name: "قسم المبيعات", manager: "سارة يوسف", description: "متابعة عمليات البيع وخدمة العملاء." },
    { id: 3, name: "قسم المحاسبة", manager: "محمد حسن", description: "إدارة الشؤون المالية والمحاسبة." },
  ]);

  const [formDataSection, setFormDataSection] = useState({
    name: "",
    manager: "",
    description: "",
  });

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

  const handleSubmitSection = () => {
    if (!formDataSection.name.trim() || !formDataSection.manager.trim() || !formDataSection.description.trim()) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    // إضافة القسم محلياً
    const newSection = {
      id: sections.length + 1,
      name: formDataSection.name,
      manager: formDataSection.manager,
      description: formDataSection.description,
    };
    setSections([...sections, newSection]);

    // اغلاق المودال ومسح الحقول
    setFormDataSection({ name: "", manager: "", description: "" });
    setShowModal1(false);
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
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto flex"
        dir="rtl"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        {/* القسم اليساري */}
        <div className="w-2/3 pr-6 border-l border-gray-300 ml-10">
          <div className="flex justify-between items-center mb-10 max-w-[1132px] mx-auto">
            <h1 className="text-3xl font-bold" style={{ color: theme.palette.text.primary }}>
              المستودعات
            </h1>
            <button
              onClick={openAddModal}
              className="text-sm font-medium py-2 px-4 ml-10 rounded-md hover:bg-[#e57d18] transition"
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
                  <h2 className="text-lg font-bold mb-1" style={{ color: theme.palette.text.primary }}>
                    {warehouse.name}
                  </h2>
                  <p className="text-sm mb-1" style={{ color: theme.palette.text.secondary }}>
                    الموقع: {warehouse.location}
                  </p>
                  <p className="text-sm" style={{ color: theme.palette.text.secondary }}>
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

        {/* القسم اليميني */}
        <div className="flex-1 pl-6 w-1/3">
          <div className="flex justify-between items-center mb-6 ">
            <h2 className="text-3xl font-bold mr-7">الأقسام</h2>
            <button
              className="text-sm font-medium py-2 px-4 mr-10 rounded-md hover:bg-[#e57d18] transition"
              style={{ backgroundColor: "#FF8E29", color: "#fff" }}
              onClick={() => setShowModal1(true)}
            >
              إضافة قسم
            </button>
          </div>
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="p-4 rounded-lg shadow hover:shadow-md transition"
                style={{
                  backgroundColor: index % 2 === 0 ? "#FFF4EA" : "#F5F5F5",
                }}
              >
                <h3 className="text-lg font-bold mb-1">{section.name}</h3>
                <p className="text-sm text-gray-600 mb-1">المدير: {section.manager}</p>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* مودال المستودع */}
      {showModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "32px 40px",
        minWidth: "480px",
        textAlign: "right",
        boxShadow: "0 4px 24px #0002",
      }}
      dir="rtl"
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {editingWarehouse ? "تعديل المستودع" : "إضافة مستودع جديد"}
      </h2>

      {/* اسم المستودع */}
      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "6px",
            fontWeight: "bold",
          }}
        >
          اسم المستودع
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            fontSize: "14px",
          }}
          value={formData.name}
          onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
        />
      </div>

      {/* الموقع */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "6px",
            fontWeight: "bold",
          }}
        >
          الموقع
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            fontSize: "14px",
          }}
          value={formData.location}
          onChange={(e) => setFormData((f) => ({ ...f, location: e.target.value }))}
        />
      </div>

      {/* الأزرار */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <button
          style={{
            background: "#FF8E29",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px 32px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          حفظ
        </button>
        <button
          style={{
            background: "#eee",
            color: "#333",
            borderRadius: "12px",
            padding: "10px 32px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
)}


      {/* مودال القسم */}
      {showModal1 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "32px 40px",
              minWidth: "480px",
              textAlign: "right",
              boxShadow: "0 4px 24px #0002",
            }}
            dir="rtl"
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              إضافة قسم جديد
            </h2>

            {/* اسم القسم */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "bold" }}>
                اسم القسم
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
                value={formDataSection.name}
                onChange={(e) => setFormDataSection((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            {/* اسم المدير */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "bold" }}>
                اسم المدير المسؤول
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
                value={formDataSection.manager}
                onChange={(e) => setFormDataSection((f) => ({ ...f, manager: e.target.value }))}
              />
            </div>

            {/* وصف القسم */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", marginBottom: "6px", fontWeight: "bold" }}>
                وصف القسم
              </label>
              <textarea
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  fontSize: "14px",
                  resize: "none",
                }}
                value={formDataSection.description}
                onChange={(e) => setFormDataSection((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            {/* الأزرار */}
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <button
                style={{
                  background: "#FF8E29",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "10px 32px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleSubmitSection}
              >
                تأكيد
              </button>
              <button
                style={{
                  background: "#eee",
                  color: "#333",
                  borderRadius: "12px",
                  padding: "10px 32px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowModal1(false)}
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
