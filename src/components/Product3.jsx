import React, { useState } from "react";
import "./Product3.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Product3() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const token = localStorage.getItem("token");

  // استقبال البيانات من الصفحة الثانية + استرجاع الملاحظات إذا رجع المستخدم
  const productData = location.state || {};
  const [notes, setNotes] = useState(productData.notes || "");

  const [showConfirm, setShowConfirm] = useState(false);

  const handleBack = () => {
    navigate("/Addproduct2", { state: { ...productData, notes } });
  };

  const handleNext = async () => {
    const { image, ...formDataWithoutImage } = productData.formData;

    const finalProduct = {
      name: productData.formData.name || "", 
      code: productData.formData.code || "", 
      unit: productData.formData.unit || "", 
      consumable: productData.formData.consumable === "مستهلك" ? true : false,
      warehouse_id: productData.formData.warehouse_id || "", 
      notes,
    };
    console.log("سيتم إرسال البيانات:", finalProduct);

    //   const handleNext = async () => {
    // const finalProduct = {
    //   formData: {
    //     ...productData.formData,
    //     consumable: productData.formData.consumable === "مستهلك" ? true : false,
    //   },
    //   notes,
    // };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/products/store",
        finalProduct,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("النتيجة من السيرفر:", data);

      if (data.success) {
        navigate("/dashboard");
      } else {
        alert("حدث خطأ أثناء حفظ المنتج: " + data.message);
      }
    } catch (error) {
      console.error("خطأ في الاتصال بالـ API:", error);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }

    setShowConfirm(false);
  };

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
            الملاحظات
          </p>
          <textarea
            className="description-box"
            placeholder="الوصف"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              backgroundColor: theme.palette.background.ma, 
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
            }}
          />

          <div className="nav-buttons">
            <button className="back-button" onClick={handleBack}>
              السابق
            </button>
            <button
              className="nextbutton"
              onClick={() => setShowConfirm(true)}
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

      {showConfirm && (
        <div className="overlay">
          <div className="custom-modal confirm-modal" dir="rtl">
            <p className="confirm-title">تأكيد إضافة منتج</p>
            <p className="confirm-text">هل أنت متأكد؟</p>
            <div className="modal-buttons">
              <button
                className="btn cancel"
                onClick={() => setShowConfirm(false)}

              >
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
