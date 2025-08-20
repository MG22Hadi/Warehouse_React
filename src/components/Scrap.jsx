import React, { useState } from "react";
import "./Scrap.css";

const ScrapNote = () => {

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
          <p className="text-lg font-semibold">مذكرة اتلاف</p>
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
              <th rowSpan="2" className="center-text">الرقم التسلسلي</th>
              <th colSpan="3">المواد</th>
              <th rowSpan="2" className="center-text">الكمية</th>
              <th rowSpan="2" className="center-text">الملاحظات</th>
            </tr>
            
            <tr>
              <th>كود المادة</th>
              <th  >اسم المادة و الوصف</th>
              <th>الوحدة</th>
            </tr>
          </thead>
          <tbody>
            {Array(9).fill().map((_, index) => (
              <tr key={index}>
                <td className="center-text">1</td>
                <td>ITM-1001</td>
                <td>Printer Canon</td>
                <td>لاسلكي، بحجم A4</td>
                <td> 10 قطعة</td>
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
    </div>
  );
};

export default ScrapNote;
