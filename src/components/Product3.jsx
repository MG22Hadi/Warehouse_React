import React, { useState } from "react";
import "./Product3.css";
import { useNavigate } from "react-router-dom";

export default function AProduct3() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate(); 

  const handleNext = () => {
    setShowConfirm(false);
  };

  const handleBack = () => {
    navigate("/Addproduct2"); 
  };

  return (
    <div className="media-container">
      <div className="new_product">اضافة منتج جديد</div>
      <div className="under_new_product">يرجى تعبئة بيانات المنتج بشكل مفصل</div>

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
          <div className="progress-line1"></div>
          <div className="progress-step active">
            <div className="step-number"></div>
            <div className="step-label">ملاحظات</div>
          </div>
        </div>

        <div className="media-content">
          <p className="info_product">الملاحظات</p>
          <textarea className="description-box" placeholder="الوصف" />

          <div className="nav-buttons">
            <button className="back-button" onClick={handleBack}>
              السابق
            </button>
            <button className="nextbutton" onClick={() => setShowConfirm(true)}>
              التالي
            </button>
          </div>
        </div>
      </div>

      {/* نافذة التأكيد */}
      {showConfirm && (
        <div className="overlay">
          <div className="custom-modal confirm-modal" dir="rtl">
            <p className="confirm-title">تأكيد إضافة منتج</p>
            <p className="confirm-text">هل أنت متأكد؟</p>
            <div className="modal-buttons">
              <button className="btn cancel" onClick={() => setShowConfirm(false)}>
                لا
              </button>
              <button className="btn confirm" onClick={handleNext}>
                نعم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
