import React, { useState } from "react";
import MainLayout from "../MainLayout";
import "../components/Receiving.css";

export default function CreateReceivingNote({ mode, toggleTheme }) {
  const [showModal, setShowModal] = useState(false);

  const inputStyle = {
    padding: '6px 8px',
    border: '1px solid transparent',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border 0.2s'
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="إنشاء مذكرة ">
      <div className="w-full flex justify-center items-start min-h-screen" dir="rtl">
        <div className="container bg-white rounded-2xl shadow-lg p-8" style={{ maxWidth: '1200px', paddingTop: '75px', marginTop: '8px' }}>
          
          <div className="header">
            <div className="top-right">
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="black">رقم التسلسل:</span>
                <input type="text" style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.border = '1px solid #FF8E29'}
                  onBlur={e => e.target.style.border = '1px solid transparent'}
                />
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="black">المستودع:</span>
                <input type="text" style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.border = '1px solid #FF8E29'}
                  onBlur={e => e.target.style.border = '1px solid transparent'}
                />
              </p>
            </div>

            <div className="title">
              <p className="text-lg font-semibold">مذكرة استلام</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="black">التاريخ:</span>
                <input type="date" style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.border = '1px solid #FF8E29'}
                  onBlur={e => e.target.style.border = '1px solid transparent'}
                />
              </p>
            </div>

            <div className="top-left">
              <p className="black">الجمهورية العربية السورية</p>
              <p className="gray">وزارة المالية</p>
            </div>
          </div>

          <div className="table-wrapper mt-8">
            <table>
              <thead>
                <tr>
                  <th rowSpan="2" className="center-text">الرقم التسلسلي</th>
                  <th colSpan="3" className="center-text">المواد</th>
                  <th rowSpan="2" className="center-text">الكمية المستلمة</th>
                  <th rowSpan="2" className="center-text">سعر الواحدة</th>
                  <th rowSpan="2" className="center-text">السعر الإجمالي</th>
                  <th rowSpan="2" className="center-text">ملاحظات</th>
                </tr>
                <tr>
                  <th className="center-text">كود المادة</th>
                  <th className="center-text">اسم المادة و الوصف</th>
                  <th className="center-text">الوحدة</th>
                </tr>
              </thead>
              <tbody>
                {Array(10).fill().map((_, index) => (
                  <tr key={index}>
                    {Array(8).fill().map((__, i) => (
                      <td key={i} className="center-text" style={{ padding: '8px' }}>
                        <input
                          type={i >= 4 && i <= 6 ? "number" : "text"}
                          className="table-input"
                          style={inputStyle}
                          onFocus={e => e.target.style.border = '1px solid #FF8E29'}
                          onBlur={e => e.target.style.border = '1px solid transparent'}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="total mt-8">
            <span className="grand_total">الإجمالي:</span>
            <input type="text" className="price"  style={{ ...inputStyle, flex: 1 }}
  onFocus={e => e.target.style.border = '1px solid #FF8E29'}
  onBlur={e => e.target.style.border = '1px solid transparent'} />
          </div>

          <div className="footer mt-8">
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="grand_total">أمين المستودع:</span>
              <input type="text" style={{ ...inputStyle, flex: 1 }}
                    onFocus={e => e.target.style.border = '1px solid #FF8E29'}
                    onBlur={e => e.target.style.border = '1px solid transparent'}
              />
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="grand_total">المستلم:</span>
              <input type="text" style={{ ...inputStyle, flex: 1 }}
                onFocus={e => e.target.style.border = '1px solid #FF8E29'}
                onBlur={e => e.target.style.border = '1px solid transparent'}
              />
            </p>
          </div>

          <div className="w-full flex justify-center mt-8">
            <button style={{ background:'#FF8E29', color:'#fff', borderRadius:'30px', padding:'12px 40px', fontSize:'18px', fontWeight:'bold', boxShadow:'0 2px 8px #ff8e2940', border:'none', cursor:'pointer'}} onClick={()=>setShowModal(true)}>
              تأكيد إنشاء المذكرة
            </button>
          </div>

          {showModal && (
            <div style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 }}>
              <div style={{ background:'#fff', borderRadius:'20px', padding:'32px 40px', minWidth:'320px', textAlign:'center', boxShadow:'0 4px 24px #0002' }}>
                <h2 style={{ fontSize:'20px', fontWeight:'bold', marginBottom:'16px' }}>تأكيد الإنشاء</h2>
                <p style={{ fontSize:'16px', marginBottom:'24px' }}>هل تريد إنشاء مذكرة استلام جديدة؟</p>
                <div style={{ display:'flex', gap:'16px', justifyContent:'center' }}>
                  <button style={{ background:'#FF8E29', color:'#fff', borderRadius:'12px', padding:'10px 32px', fontSize:'16px', fontWeight:'bold', border:'none', cursor:'pointer'}} onClick={()=>setShowModal(false)}>تأكيد</button>
                  <button style={{ background:'#eee', color:'#333', borderRadius:'12px', padding:'10px 32px', fontSize:'16px', fontWeight:'bold', border:'none', cursor:'pointer'}} onClick={()=>setShowModal(false)}>إلغاء</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}
