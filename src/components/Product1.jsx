import React, { useState } from "react";
import "./Product1.css";
import { useNavigate } from "react-router-dom";

export default function AProduct1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    quantity: "",
    warehouse: "",
  });

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "يرجى تعبئة هذا الحقل";
    if (!formData.type.trim()) newErrors.type = "يرجى تعبئة هذا الحقل";
    if (!formData.price.trim()) newErrors.price = "يرجى تعبئة هذا الحقل";
    if (!formData.quantity.trim()) newErrors.quantity = "يرجى تعبئة هذا الحقل";
    if (!formData.warehouse.trim()) newErrors.warehouse = "يرجى تعبئة هذا الحقل";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/Addproduct2");
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
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="type"
                  placeholder="النوع"
                  value={formData.type}
                  onChange={handleChange}
                />
                {errors.type && <span className="error-message">{errors.type}</span>}
              </div>
            </div>

            {/* السعر والكمية */}
            <div className="input-row">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="price"
                  placeholder="السعر"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="quantity"
                  placeholder="الكمية"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && <span className="error-message">{errors.quantity}</span>}
              </div>
            </div>

            {/* المستودع */}
            <div className="input-wrapper full-width">
              <input
                type="text"
                name="warehouse"
                placeholder="المستودع"
                className="centered-input"
                value={formData.warehouse}
                onChange={handleChange}
              />
              {errors.warehouse && (
                <span className="error-message">{errors.warehouse}</span>
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
