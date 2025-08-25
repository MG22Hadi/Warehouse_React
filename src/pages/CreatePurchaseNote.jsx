import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import "./../components/Purchase.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePurchaseNote({ mode, toggleTheme }) {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleFinaleSubmit = () => {
    navigate("/AllPurchase");
  };

  const [items, setItems] = useState(
    Array(11)
      .fill()
      .map((_, idx) => ({
        serial: idx + 1,
        product_id: "",
        product_code: "",
        product_unit: "",
        quantity: "",
        notes: "",
      }))
  );

  const [entryDate, setEntryDate] = useState("");

  const inputStyle = {
    padding: "6px 8px",
    border: "1px solid transparent",
    borderRadius: "6px",
    outline: "none",
    transition: "border 0.2s",
    width: "100%",
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
      .then((res) => {
        setProducts(res.data.data.products);
      })
      .catch((err) => {
        console.error("خطأ بجلب المواد:", err);
      });
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

  // إرسال المذكرة
  const handleSubmit = () => {
    if (!entryDate) {
      alert("الرجاء اختيار التاريخ");
      return;
    }
    if (!selectedWarehouse) {
      alert("الرجاء اختيار المستودع قبل إنشاء المذكرة");
      return;
    }
    const payload = {
      date: entryDate,
      items: items
        .filter((i) => i.product_id && i.quantity)
        .map((i) => ({
          product_id: i.product_id,
          warehouse_id: selectedWarehouse,
          quantity: parseInt(i.quantity),
          notes: i.notes,
        })),
    };

    axios
      .post("http://localhost:8000/api/purchase-requests/store", payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("تم الإنشاء:", res.data);
        setShowModal(false);
        handleFinaleSubmit();
      })
      .catch((err) => {
        console.error("خطأ أثناء الإنشاء:", err);
      });
  };

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="إنشاء طلب شراء"
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
                  value=""
                  disabled
                  style={{ ...inputStyle, flex: 1 }}
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
              <p className="text-lg font-semibold">طلبات شراء</p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="black">التاريخ:</span>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
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
                  <th className="center-text">اسم المادة والوصف</th>
                  <th className="center-text">الوحدة</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {/* الرقم التسلسلي */}
                    <td className="center-text">{row.serial}</td>

                    {/* كود المادة */}
                    <td className="center-text" style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={row.product_code}
                        readOnly
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.border = "1px solid #FF8E29")
                        }
                        onBlur={(e) =>
                          (e.target.style.border = "1px solid transparent")
                        }
                      />
                    </td>

                    {/* اسم المادة */}
                    <td className="center-text" style={{ padding: "8px" }}>
                      <select
                        style={inputStyle}
                        value={row.product_id}
                        onChange={(e) =>
                          handleProductChange(rowIndex, e.target.value)
                        }
                        onFocus={(e) =>
                          (e.target.style.border = "1px solid #FF8E29")
                        }
                        onBlur={(e) =>
                          (e.target.style.border = "1px solid transparent")
                        }
                      >
                        <option value="">اختر مادة...</option>
                        {Array.isArray(products) &&
                          products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                      </select>
                    </td>

                    {/* الوحدة */}
                    <td className="center-text" style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={row.product_unit}
                        readOnly
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.border = "1px solid #FF8E29")
                        }
                        onBlur={(e) =>
                          (e.target.style.border = "1px solid transparent")
                        }
                      />
                    </td>

                    {/* الكمية */}
                    <td className="center-text">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) =>
                          handleChange(rowIndex, "quantity", e.target.value)
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.border = "1px solid #FF8E29")
                        }
                        onBlur={(e) =>
                          (e.target.style.border = "1px solid transparent")
                        }
                      />
                    </td>

                    {/* الملاحظات */}
                    <td className="center-text">
                      <input
                        type="text"
                        value={row.notes}
                        onChange={(e) =>
                          handleChange(rowIndex, "notes", e.target.value)
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.border = "1px solid #FF8E29")
                        }
                        onBlur={(e) =>
                          (e.target.style.border = "1px solid transparent")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== الزر ===== */}
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
                  هل تريد إنشاء طلب شراء جديد؟
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
