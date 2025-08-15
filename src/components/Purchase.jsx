import React, { useState } from "react";
import "./Purchase.css";

const PurchaseNote = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {

    setShowConfirm(false);
  };

  return (
    <div className="container" dir="rtl">
      <div className="header">
        <div className="top-right">
          <p>
            <span className="black"> رقم التسلسل:</span>
            <span className="storage"> 12345678</span>
          </p>
          <p className="gray">مستودع الرياض</p>
        </div>
        <div className="title">
          <p className="text-lg font-semibold"> طلبات الشراء</p>
          <p className="Date">
            <span className="black"> التاريخ :</span>
            <span className="storage"> 2024-05-20</span>
          </p>
        </div>
        <div className="top-left">
          <p className="black">الجمهورية العربية السورية</p>
          <p className="gray">وزارة المالية</p>
        </div>
      </div>
      <div className="table-wrapper">
  <table>
    <thead>
  <tr>
    <th rowSpan="2" class="center-text">الرقم التسلسلي</th>
    <th colSpan="3" class="center-text">المواد</th>
    <th rowSpan="2" class="center-text">الكمية المطلوبة</th>
    <th rowSpan="2" class="center-text">ملاحظات</th>
  </tr>
  <tr>
    <th class="center-text">كود المادة</th>
    <th class="center-text">اسم المادة و الوصف</th>
    <th class="center-text">الوحدة</th>
  </tr>
</thead>

    <tbody>
      {Array(8).fill().map((_, index) => (
        <tr key={index}>
          <td className="center-text">{index + 1}</td>
          <td className="center-text">ITM-1001</td>
          <td className="center-text">طابعة كانون</td>
          <td className="center-text">لاسلكي، بحجم A4</td>
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
        إنشاء طلب شراء
      </button>

      {showConfirm && (
        <div className="overlay">
          <div className="custom-modal" dir="rtl">
            <p className="first_line">تأكيد إنشاء طلب شراء</p>
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

export default PurchaseNote;
