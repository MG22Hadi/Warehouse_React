import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import "../components/Exit.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateInstallmosNote({ mode, toggleTheme }) {
  const [showModal, setShowModal] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const selectedWh = warehouses.find((wh) => wh.id === selectedWarehouse);
  const [items, setItems] = useState(
    Array(10)
      .fill()
      .map((_, idx) => ({
        serial: idx + 1,
        product_id: "",
        product_code: "",
        product_name: "",
        product_unit: "",
        quantity: "",
        notes: "",
      }))
  );
  const [reportDate, setReportDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [receiver, setReceiver] = useState("");

  const token = localStorage.getItem("token");

  const inputStyle = {
    padding: "6px 8px",
    border: "1px solid transparent",
    borderRadius: "6px",
    outline: "none",
    transition: "border 0.2s",
  };

  const handleFinaleSubmit = () => {
    navigate("/AllInstallReports");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/warehouses/index", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setWarehouses(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProducts(res.data.data.products))
      .catch((err) => console.error("خطأ بجلب المواد:", err));
  }, []);

  // عند اختيار مادة
  const handleProductChange = (rowIndex, productId) => {
    const selected = products.find((p) => p.id === parseInt(productId));
    setItems((prev) => {
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        product_id: selected?.id || "",
        product_code: selected?.code || "",
        product_name: selected?.name || "",
        product_unit: selected?.unit || "",
      };
      return updated;
    });
  };

  // تعديل الكمية والملاحظات
  const handleChange = (rowIndex, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[rowIndex][field] = value;
      return updated;
    });
  };

  // إرسال المذكرة للـ API
  const handleSubmit = () => {
    if (!warehouses || !reportDate) {
      alert("الرجاء تعبئة الموقع والتاريخ قبل الإرسال");
      return;
    }

    const payload = {
      location: selectedWh?.name + " - " + selectedWh?.location,
      type: "stock_usage",
      date: reportDate,
      notes: "تركيب من المستودع",
      materials: items
        .filter((i) => i.product_id && i.quantity)
        .map((i) => ({
          product_id: i.product_id,
          quantity: parseInt(i.quantity),
          notes: i.notes,
        })),
    };

    axios
      .post("http://localhost:8000/api/InstallationReport/store", payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("تم الإنشاء:", res.data);
        setShowModal(false);
        alert(res.data.message);
        handleFinaleSubmit();
      })
      .catch((err) => {
        console.error("خطأ أثناء الإنشاء:", err);
        alert("حدث خطأ أثناء إنشاء المذكرة");
      });
  };

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="إنشاء مذكرة إخراج"
    >
      <div
        className="w-full flex justify-center items-start min-h-screen"
        dir="rtl"
      >
        <div
          className="container bg-white rounded-2xl shadow-lg p-8"
          style={{ maxWidth: "1200px", paddingTop: "75px", marginTop: "8px" }}
        >
          {/* ===== Header ===== */}
          <div className="header">
            <div className="top-right">
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="black">رقم التسلسل:</span>
                <input
                  type="text"
                  readOnly
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={(e) => (e.target.style.border = "1px solid #FF8E29")}
                  onBlur={(e) =>
                    (e.target.style.border = "1px solid transparent")
                  }
                />
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="black">المستودع:</span>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(Number(e.target.value))}
                  style={{ ...inputStyle, flex: 1 }}
                >
                  <option value="">اختر المستودع...</option>
                  {warehouses.map((wh) => (
                    <option key={wh.id} value={wh.id}>
                      {wh.name} - {wh.location}
                    </option>
                  ))}
                </select>
              </p>
            </div>

            <div className="title">
              <p className="text-lg font-semibold">ضبط تركيب من المستودع</p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="black">التاريخ:</span>
                <input
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={(e) => (e.target.style.border = "1px solid #FF8E29")}
                  onBlur={(e) =>
                    (e.target.style.border = "1px solid transparent")
                  }
                />
              </p>
            </div>

            <div className="top-left">
              <p className="black">الجمهورية العربية السورية</p>
              <p className="gray">وزارة المالية</p>
            </div>
          </div>

          {/* ===== الجدول ===== */}
          <div className="table-wrapper mt-8">
            <table>
              <thead>
                <tr>
                  <th rowSpan="2" className="center-text">
                    الرقم التسلسلي
                  </th>
                  <th colSpan="3" className="center-text">
                    المواد
                  </th>
                  <th rowSpan="2" className="center-text">
                    الكمية المستلمة
                  </th>
                  <th rowSpan="2" className="center-text">
                    ملاحظات
                  </th>
                </tr>
                <tr>
                  <th className="center-text">كود المادة</th>
                  <th className="center-text">اسم المادة و الوصف</th>
                  <th className="center-text">الوحدة</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="center-text">{row.serial}</td>

                    <td className="center-text">
                      <input
                        type="text"
                        value={row.product_code}
                        readOnly
                        style={inputStyle}
                      />
                    </td>

                    <td className="center-text">
                      <select
                        style={inputStyle}
                        value={row.product_id}
                        onChange={(e) =>
                          handleProductChange(rowIndex, e.target.value)
                        }
                      >
                        <option value="">اختر مادة...</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="center-text">
                      <input
                        type="text"
                        value={row.product_unit}
                        readOnly
                        style={inputStyle}
                      />
                    </td>

                    <td className="center-text">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) =>
                          handleChange(rowIndex, "quantity", e.target.value)
                        }
                        style={inputStyle}
                      />
                    </td>

                    <td className="center-text">
                      <input
                        type="text"
                        value={row.notes}
                        onChange={(e) =>
                          handleChange(rowIndex, "notes", e.target.value)
                        }
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Footer ===== */}
          <div className="footer mt-8">
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="grand_total">أمين المستودع:</span>
              <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="grand_total">المستلم:</span>
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
            </p>
          </div>

          {/* ===== زر التأكيد ===== */}
          <div className="w-full flex justify-center mt-8">
            <button
              style={{
                background: "#FF8E29",
                color: "#fff",
                borderRadius: "30px",
                padding: "12px 40px",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 2px 8px #ff8e2940",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(true)}
            >
              تأكيد إنشاء المذكرة
            </button>
          </div>

          {/* ===== المودال ===== */}
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
                  minWidth: "320px",
                  textAlign: "center",
                  boxShadow: "0 4px 24px #0002",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  تأكيد الإنشاء
                </h2>
                <p style={{ fontSize: "16px", marginBottom: "24px" }}>
                  هل تريد إنشاء مذكرة إخراج جديدة؟
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                  }}
                >
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
                    onClick={() => setShowModal(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
