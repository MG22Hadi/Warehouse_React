import React, { useState, useRef } from "react";
import "./Product2.css";
import { useNavigate } from "react-router-dom";

export default function Product2({ onNext, initialData }) {
  const navigate = useNavigate();

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
          <div className="progress-line1"></div>
          <div className="progress-step active">
            <div className="step-number"></div>
            <div className="step-label">صورة المنتج</div>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <div className="step-number1"></div>
            <div className="step-label">ملاحظات</div>
          </div>
        </div>

        <div className="media-content">
          <p className="info_product">صورة المنتج</p>

          <div className="upload-box" onClick={handleUploadClick}>
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
            <button className="back-button" onClick={handleBack}>
              السابق
            </button>
            <button className="nextbutton" onClick={handleNext}>
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
