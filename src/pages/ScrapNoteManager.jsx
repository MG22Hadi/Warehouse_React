import React, { useState } from "react";
import { useParams } from "react-router-dom";

// ملاحظة: تأكد من أن ملف التصميم مستورد، مثلاً:
// import "./ScrapNoteManager.css"; 

// --- الخطوة 1: تعريف بيانات ثابتة للمذكرة ---
const staticNoteData = {
  serial_number: 'SCR-2025-001',
  date: '2025-08-20',
  warehouse: { name: 'المستودع الرئيسي' },
  created_by: { name: 'أمين المستودع' },
  user: { name: 'المستلم الافتراضي' },
  materials: [
    { product: { code: 'P001', name: 'مادة تالفة 1', unit: 'قطعة' }, quantity: 10, notes: 'كسر' },
    { product: { code: 'P002', name: 'مادة تالفة 2', unit: 'صندوق' }, quantity: 5, notes: 'رطوبة' },
    { product: { code: 'P003', name: 'مادة منتهية الصلاحية', unit: 'كيلو' }, quantity: 15, notes: '' },
  ]
};

export default function ScrapNoteManager() {
  const { id: noteId } = useParams(); 
  
  // --- الخطوة 2: استخدام البيانات الثابتة مباشرة ---
  const [note, setNote] = useState(staticNoteData);

  // تم إزالة useEffect و useState الخاص بالـ loading

  const handleApprove = () => {
    alert(`تمت الموافقة على المذكرة رقم ${note.serial_number}`);
  };

  const handleReject = () => {
    alert(`تم رفض المذكرة رقم ${note.serial_number}`);
  };

  // لا حاجة لشاشة التحميل أو رسالة الخطأ بعد الآن
  if (!note) {
    return <div className="flex justify-center items-center h-screen">خطأ في عرض البيانات.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#FFF4EA] p-8 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white rounded-[20px] p-8 shadow-lg">
        
        <div className="container" dir="rtl">
          <div className="entry-header">
            <div className="top-right">
              <p>
                <span className="black"> رقم التسلسل:</span>
                <span className="storage"> {note.serial_number}</span>
              </p>
              <p className="gray">{note.warehouse?.name || "—"}</p>
            </div>
            <div className="title">
              <p className="text-lg font-semibold">مذكرة اتلاف</p>
              <p className="Date">
                <span className="black"> التاريخ :</span>
                <span className="storage"> {note.date?.slice(0, 10)}</span>
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
                  <th>اسم المادة و الوصف</th>
                  <th>الوحدة</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 11 }).map((_, index) => {
                  const item = note.materials?.[index];
                  return (
                    <tr key={index}>
                      <td className="center-text">{index + 1}</td>
                      <td>{item ? item.product?.code : ""}</td>
                      <td>{item ? item.product?.name : ""}</td>
                      <td>{item ? item.product?.unit : ""}</td>
                      <td>{item ? item.quantity : ""}</td>
                      <td className="center-text">{item ? item.notes : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="footer">
            <p>
              <span className="grand_total">أمين المستودع:</span>
              <span className="price"> {note.created_by?.name || "—"}</span>
            </p>
            <p>
              <span className="grand_total"> المستلم:</span>
              <span className="price"> {note.user?.name || "—"}</span>
            </p>
          </div>
        </div>

        {/* أزرار الموافقة والرفض */}
        <div className="flex justify-center items-center gap-4 mt-8">
            <button 
                onClick={handleReject}
                className="bg-[#EB001B] text-white font-bold py-2 px-10 rounded-lg hover:bg-[#b30015] transition-colors duration-300"
            >
                رفض
            </button>
            <button 
                onClick={handleApprove}
                className="bg-[#28A745] text-white font-bold py-2 px-10 rounded-lg hover:bg-[#218838] transition-colors duration-300"
            >
                موافقة
            </button>
        </div>

      </div>
    </div>
  );
}