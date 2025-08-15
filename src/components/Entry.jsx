// EntryNote.jsx
import React from "react";
import "./Entry.css";

const EntryNote = () => {
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
          <p className="text-lg font-semibold">مذكرة إدخال</p>
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
              <th rowSpan="2">الرقم التسلسلي</th>
              <th colSpan="3">المواد</th>
              <th rowSpan="2">الكمية المستلمة</th>
              <th rowSpan="2">ملاحظات</th>
            </tr>
            <tr>
              <th>كود المادة</th>
              <th> اسم المادة والوصف</th>
              <th>الوحدة</th>
            </tr>
          </thead>
          <tbody>
            {Array(10).fill().map((_, index) => (
              <tr key={index}>
                <td>1</td>
                <td>ITM-1001</td>
                <td>Printer Canon</td>
                <td>PCS</td>
                <td>300</td>
                <td>تسليم عاجل</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total">
        <span className="grand_total">الإجمالي:</span>
         <span className="price"> $1,200.00</span>
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
    </div>
  );
};

export default EntryNote;
