import React, { useState } from 'react'
import './ProductForm.css'
import { useNavigate } from "react-router-dom";


function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    warehouse: 'warehouse',
    unit: 'Unit',
    consumable: false
  })

  // const Stepper = ({ activeStep }) => {
  // const steps = [
  //   { label: 'Product info' },
  //   { label: 'Media' },
  //   { label: 'Notes' }
  // ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

//   const handleNext = () => {
//     console.log('Form data:', formData)
//   }

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/mediaApload");
  }

  return (
    <div className="product-form-container">
       <div className="progress-bar">
      <div className="progress-step active">
        <div className="step-number"></div>
        <div className="step-label">معلومات المنتج</div>
      </div>
      <div className="progress-line"></div>
      <div className="progress-step">
        <div className="step-number1"></div>
        <div className="step-label">الوسائط</div>
      </div>
      <div className="progress-line"></div>
      <div className="progress-step">
        <div className="step-number"></div>
        <div className="step-label">ملاحظات</div>
      </div>
     </div>


      <div className="form-section">
        <h2 className="section-title">معلومات المنتج</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="الاسم"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="code"
              placeholder="الرمز"
              value={formData.code}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="warehouse">المستودع</option>
              <option value="warehouse1">المستودع 1</option>
              <option value="warehouse2">المستودع 2</option>
            </select>
          </div>
          
          <div className="form-group">
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Unit">الوحدة</option>
              <option value="Piece">القطعة</option>
              <option value="Kg">الوزن</option>
              <option value="Liter">لتر</option>
            </select>
          </div>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="consumable"
              checked={formData.consumable}
              onChange={handleInputChange}
              className="checkbox-input"
            />
            <span className="checkbox-text">مستهلك</span>
          </label>
        </div>

        <div className="form-actions">
           <button onClick={handleNext} className="next-button">
      التالي
    </button>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
