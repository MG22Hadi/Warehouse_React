import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import "./../components/Entry.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function CreateExitNote({ mode, toggleTheme }) {
  const theme = useTheme();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [materialRequestId, setMaterialRequestId] = useState(orderId || "");
  const [generalNotes, setGeneralNotes] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleFinaleSubmit = () => {
    navigate("/AllExit");
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

  const selectedIds = items.map((i) => i.product_id).filter(Boolean);

  const inputStyle = {
    padding: "6px 8px",
    border: "1px solid transparent",
    borderRadius: "6px",
    outline: "none",
    transition: "border 0.2s",
    width: "100%",
  };

  // جلب المستودعات
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
    if (!selectedWarehouse) {
      setProducts([]); // ما في مستودع، ما في مواد
      return;
    }

    axios
      .get(`http://localhost:8000/api/warehouses/show/${selectedWarehouse}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(
          res.data?.data?.warehouse?.stock?.map((s) => s.product) ?? []
        );
      })
      .catch((err) => {
        console.error("خطأ بجلب المواد:", err);
      });
  }, [selectedWarehouse]);

  // تغيير المستودع: إعادة تعيين المواقع وجلبها لكل مادة مختارة
  const handleWarehouseChange = async (value) => {
    const whId = Number(value);
    setSelectedWarehouse(whId);

    // فضّي location_id مؤقتًا
    setItems((prev) => prev.map((row) => ({ ...row, location_id: "" })));

    // جب مواقع لكل مادة مختارة
    const current = items;
    await Promise.all(
      current.map(async (row, idx) => {
        if (!row.product_id) return;
        try {
          const res = await axios.get(
            "http://localhost:8000/api/locations/product-locations",
            {
              params: {
                product_id: Number(row.product_id),
                warehouse_id: whId,
              },
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const first = res?.data?.data?.[0];
          if (first?.location_id) {
            setItems((prev) => {
              const copy = [...prev];
              copy[idx].location_id = first.location_id;
              return copy;
            });
          }
        } catch (err) {
          console.error("خطأ بجلب موقع المادة بعد تغيير المستودع:", err);
        }
      })
    );
  };

  // عند اختيار مادة
  const handleProductChange = async (rowIndex, productId) => {
    const selected = products.find((p) => p.id === Number(productId));

    // حدّث بيانات المادة
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
    if (!materialRequestId) {
      alert("الرجاء إدخال رقم طلب المواد (material_request_id)");
      return;
    }
    for (let i of items) {
      if (i.product_id && (!i.quantity || parseInt(i.quantity) === 0)) {
        alert("الكمية المستلمة يجب أن تكون أكبر من الصفر");
        return;
      }
    }

    const preparedItems = items
      .filter((i) => i.product_id && i.quantity)
      .map((i) => ({
        product_id: Number(i.product_id),
        warehouse_id: Number(selectedWarehouse),
        quantity: Number(i.quantity),
        location_id: Number(i.location_id),
        notes: i.notes || "",
      }));

    if (preparedItems.length === 0) {
      alert("أضف مادة واحدة على الأقل مع كمية صحيحة.");
      return;
    }

    const payload = {
      material_request_id: Number(materialRequestId),
      date: entryDate,
      notes: generalNotes || "",
      items: preparedItems,
    };

    axios
      .post("http://localhost:8000/api/exitNote", payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("تم الإنشاء:", res.data);
        setShowModal(false);
        handleFinaleSubmit();
        // ممكن تفضّي الفورم إذا بدك
        // window.location.reload();
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
      pageTitle="إنشاء مذكرة إخراج"
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
                      // إذا لغى اختيار المستودع نفرغ كل المواد المختارة
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
                            location_id: "", // إذا كنت تستخدم location_id
                          }))
                      );
                    } else {
                      // إذا اخترت مستودع جديد، ممكن هنا تستدعي handleWarehouseChange الأصلي
                      handleWarehouseChange(value);
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

              {/* <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  className="black"
                  style={{ color: theme.palette.text.primary }}
                >
                  رقم طلب المواد (MR):
                </span>
                <input
                  type="number"
                  placeholder=""
                  value={materialRequestId}
                  onChange={(e) => setMaterialRequestId(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
              </p> */}
            </div>

            <div className="title">
              <p
                className="text-lg font-semibold"
                style={{ color: theme.palette.text.primary }}
              >
                مذكرة إخراج
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
                    الكمية المستلمة
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
                    <td
                      className="center-text"
                      style={{ color: theme.palette.text.third }}
                    >
                      {row.serial}
                    </td>

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
