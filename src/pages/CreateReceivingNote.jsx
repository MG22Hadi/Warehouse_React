import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function CreateReceivingNote({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);

  // بيانات عامة
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseRequests, setPurchaseRequests] = useState([]);

  // القيم المختارة
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState("");
  const [entryDate, setEntryDate] = useState("");

  // المواد
  const [items, setItems] = useState(
    Array(11)
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

  const inputStyle = {
    padding: "6px 8px",
    border: "1px solid transparent",
    borderRadius: "6px",
    outline: "none",
    transition: "border 0.2s",
  };

  const tableInputStyle = { ...inputStyle, width: "120px" };

  // جلب البيانات من API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/warehouses/index", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data.success && setWarehouses(res.data.data))
      .catch((err) => console.error("خطأ بجلب المستودعات:", err));

    axios
      .get("http://localhost:8000/api/products", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProducts(res.data.data.products))
      .catch((err) => console.error("خطأ بجلب المواد:", err));

    axios
      .get("http://localhost:8000/api/suppliers", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSuppliers(res.data.data.suppliers))
      .catch((err) => console.error("خطأ بجلب الموردين:", err));

    axios
      .get("http://localhost:8000/api/purchase-requests/my-requests", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPurchaseRequests(res.data.data.purchase_requests))
      .catch((err) => console.error("خطأ بجلب طلبات الشراء:", err));
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

  // تعديل القيم في الصف
  const handleChange = (rowIndex, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[rowIndex][field] = value;
      return updated;
    });
  };

  // إرسال
  const handleSubmit = () => {
    if (
      !selectedPurchaseRequest ||
      !selectedSupplier ||
      !entryDate ||
      !selectedWarehouse
    ) {
      alert(
        "الرجاء تعبئة جميع الحقول الأساسية (طلب الشراء، المورد، التاريخ، المستودع)"
      );
      return;
    }

    const payload = {
      purchase_requests_id: selectedPurchaseRequest,
      supplier_id: selectedSupplier,
      date: entryDate,
      items: items
        .filter((i) => i.product_id && i.quantity)
        .map((i) => ({
          product_id: i.product_id,
          warehouse_id: selectedWarehouse,
          unit_price: parseFloat(i.unit_price || 0),
          quantity: parseFloat(i.quantity),
          notes: i.notes,
        })),
    };

    axios
      .post("http://localhost:8000/api/receivingNote/store", payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.message || "تم الإنشاء بنجاح");
        setShowModal(false);
        navigate("/AllReceiving");
      })
      .catch((err) => {
        console.error("خطأ أثناء الإنشاء:", err);
        alert("حدث خطأ أثناء إنشاء مذكرة الاستلام");
      });
  };

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="إنشاء مذكرة استلام"
    >
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
                  طلب الشراء:
                </span>
                <select
                  value={selectedPurchaseRequest}
                  onChange={(e) =>
                    setSelectedPurchaseRequest(Number(e.target.value))
                  }
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
                    اختر طلب شراء...
                  </option>
                  {purchaseRequests.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {pr.id} - {pr.title || "بدون عنوان"}
                    </option>
                  ))}
                </select>
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
                مذكرة استلام
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
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
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

              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  className="black"
                  style={{ color: theme.palette.text.primary }}
                >
                  المورد:
                </span>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(Number(e.target.value))}
                  style={{
                    ...inputStyle,
                    padding: "15px 8px",
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
                    اختر المورد...
                  </option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          </div>

          {/* ===== Table ===== */}
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
                    الكمية
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
                  <th>كود المادة</th>
                  <th>اسم المادة</th>
                  <th>الوحدة</th>
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
                        value={row.product_code || ""}
                        readOnly
                        style={tableInputStyle}
                      />
                    </td>
                    <td className="center-text">
                      <select
                        value={row.product_id}
                        onChange={(e) =>
                          handleProductChange(rowIndex, e.target.value)
                        }
                        style={{
                          ...inputStyle,
                          backgroundColor: theme.palette.background.default,
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
                          اختر مادة...
                        </option>
                        {products
                          .filter(
                            (p) =>
                              !selectedIds.includes(p.id) ||
                              p.id === row.product_id
                          )
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.product_unit || ""}
                        readOnly
                        style={{ inputStyle, color: theme.palette.text.third }}
                      />
                    </td>
                    <td>
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
                    <td>
                      <input
                        type="number"
                        value={row.unit_price}
                        min={0}
                        onChange={(e) =>
                          handleChange(rowIndex, "unit_price", e.target.value)
                        }
                        style={tableInputStyle}
                      />
                    </td>
                    <td>
                      {(
                        (Number(row.quantity) || 0) *
                        (Number(row.unit_price) || 0)
                      ).toFixed(2)}
                    </td>
                    <td>
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

          {/* ===== زر التأكيد ===== */}
          <div className="w-full flex justify-center mt-8">
            <button
              style={{
                background: theme.palette.primary.main,
                color: theme.palette.text.default,
                borderRadius: "30px",
                padding: "12px 40px",
                fontSize: "18px",
                fontWeight: "bold",
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
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  borderRadius: "20px",
                  padding: "32px 40px",
                  minWidth: "320px",
                  textAlign: "center",
                }}
              >
                <h2>تأكيد الإنشاء</h2>
                <p>هل تريد إنشاء مذكرة استلام جديدة؟</p>
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
                      color: theme.palette.text.default,
                      borderRadius: "12px",
                      padding: "10px 32px",
                      border: "none",
                    }}
                    onClick={handleSubmit}
                  >
                    تأكيد
                  </button>
                  <button
                    style={{
                      background: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      borderRadius: "12px",
                      padding: "10px 32px",
                      border: "none",
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
