import React, { useState } from "react";
import "./InstallUser.css";

const Installstore = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {

    setShowConfirm(false);
  };

  return (
    <div className="container" dir="rtl">
        <div className="header">
  <div className="header-right">
    <p>
      <span className="black">رقم التسلسل:</span>
      <span className="storage"> 12345678</span>
    </p>
    <p className="gray">مستودع الرياض</p>
     <p>
 <span className="black2">موقع التركيب :</span>
 <span className="storage"> مدري وين</span>
</p>
    
    
    
    
  </div>
  <div className="header-center">
    <p className="text-lg font-semibold">ضبط التركيب</p>
    <p className="info-center">
      <span className="black">التاريخ :</span>
      <span className="storage"> 2024-05-20</span>
    </p>
  </div>
  <div className="header-left">
    <p className="black">الجمهورية العربية السورية</p>
    <p className="gray">وزارة المالية</p>
   
   
   <p className="info-right">
  <span className="black">النوع :</span>
  <span className="storage"> استخدام من المستودع</span>
</p>
   
  </div>
</div>


      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th rowSpan="2" className="center-text">الرقم التسلسلي</th>
              <th colSpan="3">المواد</th>
              <th rowSpan="2" className="center-text">الكمية المستلمة</th>
              <th rowSpan="2" className="center-text">ملاحظات</th>
            </tr>
            
            <tr>
              <th>كود المادة</th>
              <th  >اسم المادة و الوصف</th>
              <th>الوحدة</th>
            </tr>
          </thead>
          <tbody>
            {Array(8).fill().map((_, index) => (
              <tr key={index}>
                <td className="center-text">1</td>
                <td>csdcs</td>
                <td>صالحة للاستخدام البشري</td>
                <td>ITM-1001</td>
                
                
               
                <td className="center-text">300</td>
                <td className="center-text">تسليم عاجل</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <p>
          <span className="grand_total">أمين المستودع:</span>
          <span className="price"> ملك مبارك</span>
        </p>
        <p>
          <span className="grand_total"> المستلم:</span>
          <span className="price"> ملك مبارك</span>
        </p>
      </div>

      <button className="creat" onClick={() => setShowConfirm(true)}>
        إنشاء ضبط تركيب
      </button>

      {showConfirm && (
        <div className="overlay">
          <div className="custom-modal" dir="rtl">
            <p className="first_line">تأكيد إنشاء ضبط تركيب</p>
            <p>
            <span>
            هل أنت متأكد  
                ؟
            </span>
            <br />
            <span className="">
                بمجرد التأكيد، سيتم خصم المواد تلقائيًا من المخزون. 
                </span>
            </p>
            
            <div className="modal-buttons">
              <button className="btn confirm" onClick={handleConfirm}>
                نعم 
              </button>
              <button className="btn cancel" onClick={() => setShowConfirm(false)}>
                لا
              </button>
            </div>
            <p className="small-text">
             
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Installstore;
