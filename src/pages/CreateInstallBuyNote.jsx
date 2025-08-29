import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import "../components/Receiving.css";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function CreateInstallBuyNote({ mode, toggleTheme }) {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

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
        unit_price: "",
        notes: "",
      }))
  );
  const selectedIds = items.map((i) => i.product_id).filter(Boolean);
  const [reportDate, setReportDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [receiver, setReceiver] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const inputStyle = {
    padding: "6px 8px",
    border: "1px solid transparent",
    borderRadius: "6px",
    outline: "none",
    transition: "border 0.2s",
  };

  const tableInputStyle = { ...inputStyle, width: "120px" };

  const selectedWh = warehouses.find((wh) => wh.id === selectedWarehouse);

  const handleSubmit = () => {
    if (!selectedWarehouse || !reportDate) {
      alert("الرجاء تعبئة الموقع والتاريخ قبل الإرسال");
      return;
    }

    const payload = {
      location: selectedWh?.name + " - " + selectedWh?.location,
      type: "purchase",
      date: reportDate,
      notes: "تركيب نظام إنذار حريق",
      materials: items
        .filter((i) => i.product_name && i.quantity)
        .map((i) => ({
          product_name: i.product_name,
          product_code: i.product_code,
          product_unit: i.product_unit,
          quantity: parseFloat(i.quantity),
          unit_price: parseFloat(i.unit_price || 0),
          location_id: selectedWarehouse,
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
        alert(res.data.message);
        console.log("تم الإنشاء:", res.data);
        setShowModal(false);
        navigate("/AllInstallStore");
      })
      .catch((err) => {
        alert("حدث خطأ أثناء إنشاء المذكرة");
        console.error("خطأ أثناء الإنشاء:", err);
      });
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
        if (res.data.success) setWarehouses(res.data.data);
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
  // const handleProductChange = (rowIndex, productId) => {
  //   const selected = products.find((p) => p.id === parseInt(productId));
  //   setItems((prev) => {
  //     const updated = [...prev];
  //     updated[rowIndex] = {
  //       ...updated[rowIndex],
  //       product_id: selected?.id || "",
  //       product_code: selected?.code || "",
  //       product_name: selected?.name || "",
  //       product_unit: selected?.unit || "",
  //     };
  //     return updated;
  //   });
  // };

  // تعديل الكمية والملاحظات
  const handleChange = (rowIndex, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[rowIndex][field] = value;
      return updated;
    });
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="إنشاء ضبط ">
      <div
        className="w-full flex justify-center items-start min-h-screen"
        dir="rtl"
      >
        <div
          className="container bg-white rounded-2xl shadow-lg p-8"
          style={{
            maxWidth: "1200px",
            paddingTop: "75px",
            marginTop: "8px",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* ===== Header ===== */}
          <div className="header">
            <div className="top-right">
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  className="black"
                  style={{ color: theme.palette.text.primary }}
                >
                  رقم التسلسل:
                </span>
                <input
                  type="text"
                  readOnly
                  style={{ ...inputStyle, flex: 1 }}
                />
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  className="black"
                  style={{ color: theme.palette.text.primary }}
                >
                  المستودع:
                </span>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(Number(e.target.value))}
                  style={{
                    ...inputStyle,
                    flex: 1,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                >
                  <option
                    value=""
                    style={{
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                    }}
                  >
                    اختر المستودع...
                  </option>
                  {warehouses.map((wh) => (
                    <option key={wh.id} value={wh.id}>
                      {wh.name} - {wh.location}
                    </option>
                  ))}
                </select>
              </p>
            </div>

            <div className="title">
              <p
                className="text-lg font-semibold"
                style={{ color: theme.palette.text.primary }}
              >
                ضبط تركيب شراء
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  className="black"
                  style={{ color: theme.palette.text.primary }}
                >
                  التاريخ:
                </span>
                <input
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
              </p>
            </div>

            <div className="top-left">
              <p
                className="black"
                style={{ color: theme.palette.text.primary }}
              >
                الجمهورية العربية السورية
              </p>
              <p className="gray" style={{ color: theme.palette.text.primary }}>
                وزارة المالية
              </p>
            </div>
          </div>

          {/* ===== الجدول ===== */}
          <div
            className="table-wrapper mt-8"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <table>
              <thead>
                <tr>
                  <th
                    rowSpan="2"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    الرقم التسلسلي
                  </th>
                  <th
                    colSpan="3"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    المواد
                  </th>
                  <th
                    rowSpan="2"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    الكمية المستلمة
                  </th>
                  <th
                    rowSpan="2"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    سعر الواحدة
                  </th>
                  <th
                    rowSpan="2"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    السعر الإجمالي
                  </th>
                  <th
                    rowSpan="2"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
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
                  <tr
                    key={rowIndex}
                    style={{
                      borderColor: theme.palette.divider,
                      backgroundColor: theme.palette.background.default,
                    }}
                  >
                    <td
                      className="center-text"
                      style={{ color: theme.palette.text.third }}
                    >
                      {row.serial}
                    </td>
                    <td className="center-text">
                      <input
                        type="text"
                        value={row.product_code}
                        onChange={(e) =>
                          handleChange(rowIndex, "product_code", e.target.value)
                        }
                        placeholder="كود المادة"
                        style={{
                          ...inputStyle,
                          color: theme.palette.text.primary,
                        }}
                      />
                    </td>

                    <td className="center-text">
                      <input
                        type="text"
                        value={row.product_name}
                        onChange={(e) =>
                          handleChange(rowIndex, "product_name", e.target.value)
                        }
                        placeholder="اسم المادة"
                        style={{
                          ...inputStyle,
                          color: theme.palette.text.primary,
                        }}
                      />
                    </td>

                    <td className="center-text">
                      <input
                        type="text"
                        value={row.product_unit}
                        onChange={(e) =>
                          handleChange(rowIndex, "product_unit", e.target.value)
                        }
                        placeholder="الوحدة"
                        style={{
                          ...inputStyle,
                          color: theme.palette.text.primary,
                          width: "80px",
                          padding: "4px 6px", 
                        }}
                      />
                    </td>

                    <td className="center-text">
                      <input
                        type="number"
                        value={row.quantity}
                        min={1}
                        onChange={(e) =>
                          handleChange(rowIndex, "quantity", e.target.value)
                        }
                        style={tableInputStyle}
                      />
                    </td>
                    <td className="center-text">
                      <input
                        type="number"
                        value={row.unit_price}
                        min={1}
                        onChange={(e) =>
                          handleChange(rowIndex, "unit_price", e.target.value)
                        }
                        style={tableInputStyle}
                      />
                    </td>
                    <td className="center-text" min={1}>
                      {(
                        (Number(row.quantity) || 0) *
                        (Number(row.unit_price) || 0)
                      ).toFixed(2)}
                    </td>
                    <td className="center-text">
                      <input
                        type="text"
                        value={row.notes}
                        onChange={(e) =>
                          handleChange(rowIndex, "notes", e.target.value)
                        }
                        style={tableInputStyle}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Footer ===== */}
          {/* <div className="footer mt-8">
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="grand_total">أمين المستودع:</span>
              <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
            </p>
          </div> */}

          {/* ===== زر التأكيد ===== */}
          <div className="w-full flex justify-center mt-8">
            <button
              style={{
                background: theme.palette.primary.main,
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
              تأكيد إنشاء الضبط
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
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
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
                  هل تريد إنشاء ضبط تركيب شراء جديدة؟
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
                      background: theme.palette.primary.main,
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
                      background: theme.palette.background.ma1,
                      color: theme.palette.text.primary,
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
