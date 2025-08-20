import React, { useState } from "react";
import "./Product3.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Product3() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // استقبال البيانات من الصفحة الثانية + استرجاع الملاحظات إذا رجع المستخدم
  const productData = location.state || {};
  const [notes, setNotes] = useState(productData.notes || "");

  const [showConfirm, setShowConfirm] = useState(false);

  const handleBack = () => {
    // رجع كل البيانات مع الملاحظات
    navigate("/Addproduct2", { state: { ...productData, notes } });
  };

  const handleNext = async () => {
    const { image, ...formDataWithoutImage } = productData.formData;

    const finalProduct = {
      name: productData.formData.name || "", // اسم المنتج
      code: productData.formData.code || "", // كود المنتج
      unit: productData.formData.unit || "", // وحدة المنتج
      consumable: productData.formData.consumable === "مستهلك" ? true : false,
      warehouse_id: productData.formData.warehouse_id || "", // معرف المخزن
      // أي حقول أخرى مطلوبة حسب الـ API

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
          <div className="progress-line1"></div>
          <div className="progress-step active">
            <div className="step-number"></div>
            <div className="step-label">ملاحظات</div>
          </div>
        </div>

        <div className="media-content">
          <p className="info_product">الملاحظات</p>
          <textarea
            className="description-box"
            placeholder="الوصف"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

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
