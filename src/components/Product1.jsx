import React, { useState, useEffect } from "react";
import "./Product1.css";
import axios from "axios";

export default function Product1({ onNext, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    unit: initialData.unit || "",
    code: initialData.code || "",
    consumable: initialData.consumable || "",
    warehouse_id: initialData.warehouse_id || "",
  });

  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/warehouses/index", {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer 10|OLrvKOGVvlVK9gtwenFZi4HtU28tGXmBA8DA4uY31de52ba1",
        },
      })
      .then((res) => {
        setWarehouses(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching warehouses:", err);
        setWarehouses([]);
      });
  }, []);

  const handleNext = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "يرجى تعبئة هذا الحقل";
    if (!formData.consumable.toString().trim())
      newErrors.consumable = "يرجى تعبئة هذا الحقل";
    if (!formData.code.trim()) newErrors.code = "يرجى تعبئة هذا الحقل";
    if (!formData.unit.trim()) newErrors.unit = "يرجى تعبئة هذا الحقل";
    if (!formData.warehouse_id.toString().trim())
      newErrors.warehouse_id = "يرجى تعبئة هذا الحقل";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext({ ...initialData, ...formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="media-container">
      <div className="new_product">اضافة منتج جديد</div>
      <div className="under_new_product">
        يرجى تعبئة بيانات المنتج بشكل مفصل
      </div>

      <div className="form-box">
        <div className="progress-bar">
          <div className="progress-step active">
            <div className="step-number"></div>
            <div className="step-label">معلومات المنتج</div>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <div className="step-number1"></div>
            <div className="step-label1">صورة المنتج</div>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <div className="step-number1"></div>
            <div className="step-label">ملاحظات</div>
          </div>
        </div>

        <div className="media-content">
          <p className="info_product"> معلومات المنتج </p>

          <div className="input-fields">
            {/* الاسم والنوع */}
            <div className="input-row">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="input-wrapper">
                <select
                  name="consumable"
                  value={formData.consumable}
                  onChange={handleChange}
                  className="centered-input"
                  style={{
                    color: formData.consumable === "" ? "#6f757e" : "#000000",
                  }}
                >
                  <option value="">النوع</option>
                  <option value="مستهلك">مستهلك</option>
                  <option value="غير مستهلك">غير مستهلك</option>
                </select>
                {errors.consumable && (
                  <span className="error-message">{errors.consumable}</span>
                )}
              </div>
            </div>

            {/* الكود والوحدة */}
            <div className="input-row">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="code"
                  placeholder="الكود"
                  value={formData.code}
                  onChange={handleChange}
                />
                {errors.code && (
                  <span className="error-message">{errors.code}</span>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="unit"
                  placeholder="الوحدة"
                  value={formData.unit}
                  onChange={handleChange}
                />
                {errors.unit && (
                  <span className="error-message">{errors.unit}</span>
                )}
              </div>
            </div>

            {/* المستودع */}
            <div className="input-wrapper full-width">
              <select
                name="warehouse_id"
                value={formData.warehouse_id}
                onChange={handleChange}
                className="centered-input"
                style={{
                  color: formData.warehouse_id === "" ? "#6f757e" : "#000000",
                }}
              >
                <option value="">المستودع</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
              {errors.warehouse_id && (
                <span className="error-message">{errors.warehouse_id}</span>
              )}
            </div>
          </div>

          <div className="nav-buttons">
            <button className="nextbutton" onClick={handleNext}>
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
