import React, { useState, useRef } from "react";
import "./Product2.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Product2({ onNext, initialData }) {
  const navigate = useNavigate();
  const theme = useTheme();
  // استقبال البيانات من الصفحة الأولى
  const productData = initialData?.formData || {};

  // حالة حفظ الصورة
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleBack = () => {
    navigate("/Addproduct1", { state: { formData: productData } });
  };

  const handleNext = () => {
    onNext({ ...productData, image });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // ألوان حسب وضع الليلي/النهاري
  const inactiveStepColor =
    theme.palette.mode === "dark" ? "#FFC794" : "#FFC794";

  const activeStepColor = theme.palette.mode === "dark" ? "#151D32" : "#F5F5F5";

  const textColor = theme.palette.mode === "dark" ? "#292F45" : "#FFFFFF";

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
              style={{ backgroundColor: activeStepColor }}
            ></div>
            <div className="step-label" style={{ color: textColor }}>
              معلومات المنتج
            </div>
          </div>
          <div
            className="progress-line"
            style={{ backgroundColor: activeStepColor }}
          ></div>
          <div className="progress-step">
            <div
              className="step-number"
              style={{ backgroundColor: inactiveStepColor }}
            ></div>
            <div className="step-label" style={{ color: textColor }}>
              صورة المنتج
            </div>
          </div>
          <div
            className="progress-line"
            style={{ backgroundColor: inactiveStepColor }}
          ></div>
          <div className="progress-step">
            <div
              className="step-number"
              style={{ backgroundColor: inactiveStepColor }}
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
            صورة المنتج
          </p>

          <div
            className="upload-box"
            onClick={handleUploadClick}
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <div className="upload-icon">&#8682;</div>
            <p>
              أدخل صورة أو <span className="browse-text">Browse</span>
            </p>
            <p className="support-text">يدعم: JPG, JPEG, PNG</p>
            {image && <p>الملف المختار: {image.name}</p>}
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>

          <div className="nav-buttons">
            <button
              className="back-button"
              onClick={handleBack}
            >
              السابق
            </button>
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
