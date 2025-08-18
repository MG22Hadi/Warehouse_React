import React, { useState } from "react";
import MainLayout from "../MainLayout";
import "./../components/Custody.css";

export default function CreateCustodyNote({ mode, toggleTheme }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="إنشاء عهدة  ">
      <div className="w-full flex justify-center items-start min-h-screen" dir="rtl">
        <div className="container bg-white rounded-2xl shadow-lg p-8" style={{maxWidth: '1200px', paddingTop: '75px', marginTop: '8px'}}>
        <div className="header">
  <div className="header-right">
    <p>
      <span className="black">الرقم الوطني:</span>
      <span className="storage"> </span>
    </p>
       <p>
<span className="black"> رقم الموبايل: </span>
<span className="storage"></span>
 </p>
    
    
    <p>
<span className="black"> مكان وتاريخ الولادة : </span>
<span className="storage"> </span>
 </p>
  </div>
  <div className="header-center">
    <p className="text-lg font-semibold">العهدة الشخصية</p>
    <p className="info-center">
      <span className="black">رقم الغرفة :</span>
      <span className="storage"> </span>
    </p>
  </div>

  <div className="header-left">
    <p className="black">الجمهورية العربية السورية</p>
    <p className="gray">وزارة المالية</p>
    <p className="info-right">
  <span className="black">الرقم التسلسلي :</span>
  <span className="storage"> </span>
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
            {Array(10).fill().map((_, index) => (
              <tr key={index}>
                <td className="center-text"></td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                               
                <td className="center-text"></td>
                <td style={{padding: '20px'}} className="center-text"> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <p>
          <span className="grand_total">أمين المستودع:</span>
          <span className="price"> </span>
        </p>
        <p>
          <span className="grand_total"> المستلم:</span>
          <span className="price"> </span>
        </p>
      </div>
          <div className="w-full flex justify-center mt-8">
            <button style={{background:'#FF8E29', color:'#fff', borderRadius:'30px', padding:'12px 40px', fontSize:'18px', fontWeight:'bold', boxShadow:'0 2px 8px #ff8e2940', border:'none', cursor:'pointer'}} onClick={()=>setShowModal(true)}>
              تأكيد إنشاء المذكرة
            </button>
          </div>
          {showModal && (
            <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999}}>
              <div style={{background:'#fff', borderRadius:'20px', padding:'32px 40px', minWidth:'320px', textAlign:'center', boxShadow:'0 4px 24px #0002'}}>
                <h2 style={{fontSize:'20px', fontWeight:'bold', marginBottom:'16px'}}>تأكيد الإنشاء</h2>
                <p style={{fontSize:'16px', marginBottom:'24px'}}>هل تريد إنشاء طلب شراء جديد؟</p>
                <div style={{display:'flex', gap:'16px', justifyContent:'center'}}>
                  <button style={{background:'#FF8E29', color:'#fff', borderRadius:'12px', padding:'10px 32px', fontSize:'16px', fontWeight:'bold', border:'none', cursor:'pointer'}} onClick={()=>setShowModal(false)}>تأكيد</button>
                  <button style={{background:'#eee', color:'#333', borderRadius:'12px', padding:'10px 32px', fontSize:'16px', fontWeight:'bold', border:'none', cursor:'pointer'}} onClick={()=>setShowModal(false)}>إلغاء</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}