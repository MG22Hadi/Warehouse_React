import React, { useState } from "react";
import "./Custody.css";

const CustodyNote = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {

    setShowConfirm(false);
  };

  return (
    <div className="container" dir="rtl">
      <div className="header">
  <div className="header-right">
    <p>
      <span className="black">الرقم الوطني:</span>
      <span className="storage"> 12345678</span>
    </p>
       <p>
<span className="black"> رقم الموبايل: </span>
<span className="storage">515930295847562</span>
 </p>
    
    
    <p>
<span className="black"> مكان وتاريخ الولادة : </span>
<span className="storage">دمشق , سوريا , 25/2/2004 </span>
 </p>
  </div>
  <div className="header-center">
    <p className="text-lg font-semibold">العهدة الشخصية</p>
    <p className="info-center">
      <span className="black">رقم الغرفة :</span>
      <span className="storage"> 2024-05-20</span>
    </p>
  </div>

  <div className="header-left">
    <p className="black">الجمهورية العربية السورية</p>
    <p className="gray">وزارة المالية</p>
    <p className="info-right">
  <span className="black">الرقم التسلسلي :</span>
  <span className="storage"> 12345465</span>
</p>
  </div>
</div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th rowSpan="2" className="center-text">الرقم التسلسلي</th>
              <th colSpan="3">المواد</th>
              <th colSpan="3" className="center-text">الاستلام</th>
              <th colSpan="3" class="center-text">الارجاع</th>
              <th rowSpan="2" className="center-text">ملاحظات</th>
            </tr>
            
            <tr>
              <th>كود المادة</th>
              <th  >اسم المادة و الوصف</th>
              <th>الوحدة</th>
              <th>الكمية</th>
              <th>التاريخ</th>
              <th>الرقم</th>
              <th>الكمية</th>
              <th>التاريخ</th>
              <th>الرقم</th>
              
            </tr>
          </thead>
          <tbody>
            {Array(8).fill().map((_, index) => (
              <tr key={index}>
                <td className="center-text">1</td>
                <td>csdcs</td>
                <td>صالحة للاستخدام البشري</td>
                <td>ITM-1001</td>
                <td>500</td>
                <td>20</td>
                <td>500</td>
                <td>20</td>
                <td>20</td>
                               
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
    </div>
  );
};

export default CustodyNote;
