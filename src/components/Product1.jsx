import React, { useState, useEffect } from "react";
import "./product1.css";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

export default function Product1({ onNext, initialData }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    unit: initialData.unit || "",
    code: initialData.code || "",
    consumable: initialData.consumable || "",
    warehouse_id: initialData.warehouse_id || "",
  });

  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/warehouses/index", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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

  const inactiveStepColor =
    theme.palette.mode === "dark" ? "#FFC794" : "#FFC794";
  const activeStepColor = theme.palette.mode === "dark" ? "#151D32" : "#F5F5F5";
  const textColor = theme.palette.mode === "dark" ? "#292F45" : "#FFFFFF";

  const stepNumberStyle = {
    width: "25px",
    height: "25px",
  };

  const progressLineStyle = {
    width: "150px",

    marginTop: "-35px",
  };

  return (
    <div className="media-container">
      <div
        className="new_product"
        style={{ color: theme.palette.text.primary }}
      >
        اضافة منتج جديد
      </div>
      <div
        className="under_new_product"
        style={{ color: theme.palette.text.secondary }}
      >
        يرجى تعبئة بيانات المنتج بشكل مفصل
      </div>

      <div
        className="form-box"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <div className="progress-bar">
          <div className="progress-step active">
            <div
              className="step-number"
              style={{ ...stepNumberStyle, backgroundColor: activeStepColor }}
            ></div>
            <div className="step-label" style={{ color: textColor }}>
              معلومات المنتج
            </div>
          </div>

          <div
            className="progress-line"
            style={{ ...progressLineStyle, backgroundColor: activeStepColor }}
          ></div>

          <div className="progress-step">
            <div
              className="step-number"
              style={{ ...stepNumberStyle, backgroundColor: inactiveStepColor }}
            ></div>
            <div className="step-label" style={{ color: textColor }}>
              صورة المنتج
            </div>
          </div>

          <div
            className="progress-line"
            style={{ ...progressLineStyle, backgroundColor: inactiveStepColor }}
          ></div>

          <div className="progress-step">
            <div
              className="step-number"
              style={{ ...stepNumberStyle, backgroundColor: inactiveStepColor }}
            ></div>
            <div className="step-label" style={{ color: textColor }}>
              ملاحظات
            </div>
          </div>
        </div>

        <div className="media-content">
          <p
            className="info_product"
            style={{ color: theme.palette.text.primary }}
          >
            معلومات المنتج
          </p>
          <div className="input-fields">
            <div className="input-row">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme.palette.background.ma,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                {errors.name && (
                  <span
                    className="error-message"
                    style={{ color: theme.palette.error.main }}
                  >
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="input-wrapper">
                <select
                  name="consumable"
                  value={formData.consumable}
                  onChange={handleChange}
                  className="centered-input"
                  style={{
                    backgroundColor: theme.palette.background.ma,
                    color:
                      formData.consumable === ""
                        ? theme.palette.text.secondary
                        : theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <option value="">النوع</option>
                  <option value="مستهلك">مستهلك</option>
                  <option value="غير مستهلك">غير مستهلك</option>
                </select>
                {errors.consumable && (
                  <span
                    className="error-message"
                    style={{ color: theme.palette.error.main }}
                  >
                    {errors.consumable}
                  </span>
                )}
              </div>
            </div>
            <div className="input-row">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="code"
                  placeholder="الكود"
                  value={formData.code}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme.palette.background.ma,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                {errors.code && (
                  <span
                    className="error-message"
                    style={{ color: theme.palette.error.main }}
                  >
                    {errors.code}
                  </span>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="unit"
                  placeholder="الوحدة"
                  value={formData.unit}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme.palette.background.ma,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                {errors.unit && (
                  <span
                    className="error-message"
                    style={{ color: theme.palette.error.main }}
                  >
                    {errors.unit}
                  </span>
                )}
              </div>
            </div>
            <div className="input-wrapper full-width">
              <select
                name="warehouse_id"
                value={formData.warehouse_id}
                onChange={handleChange}
                className="centered-input"
                style={{
                  backgroundColor: theme.palette.background.ma,
                  color:
                    formData.consumable === ""
                      ? theme.palette.text.secondary
                      : theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
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
                <span
                  className="error-message"
                  style={{ color: theme.palette.error.main }}
                >
                  {errors.warehouse_id}
                </span>
              )}
            </div>
          </div>
          <div className="nav-buttons">
            <button
              className="nextbutton"
              onClick={handleNext}
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.mode === "dark" ? "#292F45" : "#FFFFFF",
              }}
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
