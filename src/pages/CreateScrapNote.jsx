import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import "./../components/Entry.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { BASE_URL } from "../api/axiosInstance";

export default function CreateScrapNote({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const token = localStorage.getItem("token");

  const handleFinaleSubmit = () => {
    navigate("/AllScrap");
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
        location_id: "",
      }))
  );

  const selectedIds = items.map((i) => i.product_id).filter(Boolean);

  const [entryDate, setEntryDate] = useState("");
  // const [warehouse, setWarehouse] = useState("");

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
      .get(`${BASE_URL}/warehouses/index`, {
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
    if (!selectedWarehouse) {
      setProducts([]); // فرغ المنتجات إذا لم يتم اختيار مستودع
      return;
    }

    axios
      .get(`${BASE_URL}/warehouses/show/${selectedWarehouse}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>
        setProducts(
          res.data?.data?.warehouse?.stock?.map((s) => s.product) ?? []
        )
      )
      .catch((err) => console.error("خطأ بجلب المواد:", err));
  }, [selectedWarehouse]);

  // عند اختيار مادة
  const handleProductChange = async (rowIndex, productId) => {
    const selected = products.find((p) => p.id === parseInt(productId));
    setItems((prev) => {
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        product_id: selected?.id || "",
        product_code: selected?.code || "",
        product_unit: selected?.unit || "",
        location_id: "",
      };
      return updated;
    });
    if (productId && selectedWarehouse) {
      try {
        const res = await axios.get(
          `${BASE_URL}/locations/product-locations`,
          {
            params: {
              product_id: Number(productId),
              warehouse_id: Number(selectedWarehouse),
            },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const firstLocation = res?.data?.data?.[0];
        if (firstLocation?.location_id) {
          setItems((prev) => {
            const updated = [...prev];
            updated[rowIndex].location_id = firstLocation.location_id;
            return updated;
          });
        }
      } catch (err) {
        console.error("خطأ بجلب موقع المادة:", err);
      }
    }
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
    if (!items.some((i) => i.location_id)) {
      alert("تأكد من أن جميع المواد لها موقع في المستودع");
      return;
    }

    if (items.some((i) => i.quantity && isNaN(Number(i.quantity)))) {
      alert("تأكد من أن جميع الكميات أرقام صحيحة");
      return;
    }

    const payload = {
      date: entryDate,
      reason: "",
      notes: "",
      materials: items
        .filter((i) => i.product_id && i.quantity && i.location_id) // استبعاد الفارغين
        .map((i) => ({
          product_id: i.product_id,
          warehouse_id: selectedWarehouse,
          quantity: parseInt(i.quantity),
          location_id: Number(i.location_id),
          notes: i.notes || "",
        })),
    };

    console.log("Payload to send:", payload);
    axios
      .post(`${BASE_URL}/scrapNote/store`, payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("تم الإنشاء:", res.data.message);
        console.log("تم الإنشاء:", res.data);
        setShowModal(false);
        handleFinaleSubmit();
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.error("خطأ أثناء الإنشاء:", err);
      });
  };

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="إنشاء مذكرة إتلاف"
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
                  value=""
                  disabled
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
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedWarehouse(value ? Number(value) : "");
                    if (!value) {
                      // إذا لغى اختيار المستودع نفرغ الحقول
                      setItems(
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
                    }
                  }}
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
                مذكرة إتلاف
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
                  onFocus={(e) => (e.target.style.border = "1px solid #FF8E29")}
                  onBlur={(e) =>
                    (e.target.style.border = "1px solid transparent")
                  }
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
                    الكمية المتلفة
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
                  <th className="center-text">اسم المادة والوصف</th>
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
                    {/* الرقم التسلسلي */}
                    <td
                      className="center-text"
                      style={{ color: theme.palette.text.third }}
                    >
                      {row.serial}
                    </td>

                    {/* كود المادة */}
                    <td className="center-text" style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={row.product_code}
                        readOnly
                        style={{ inputStyle, color: theme.palette.text.third }}
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
                      {!selectedWarehouse ? (
                        <span style={{ color: "#999", fontSize: "13px" }}>
                          (لا يمكن اختيار مادة قبل تحديد المستودع)
                        </span>
                      ) : (
                        <select
                          style={{
                            ...inputStyle,
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                          }}
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
                          {(products ?? [])
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
                      )}
                    </td>

                    {/* الوحدة */}
                    <td className="center-text" style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={row.product_unit}
                        readOnly
                        style={{ inputStyle, color: theme.palette.text.third }}
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
                        style={{ inputStyle, color: theme.palette.text.third }}
                        min={1}
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
                        style={{ inputStyle, color: theme.palette.text.third }}
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
                  هل تريد إنشاء الضبط إتلاف جديدة؟
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
