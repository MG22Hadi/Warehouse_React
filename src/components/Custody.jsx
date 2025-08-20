import React, { useState } from "react";
import "./Custody.css";

const CustodyNote = (note) => {
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
            <span className="storage"> 12345678</span>{/* ثابت */}
          </p>
          <p>
            <span className="black"> رقم الموبايل: </span>
            <span className="storage">515930295847562</span>{/* ثابت */}
          </p>

          <p>
            <span className="black"> مكان وتاريخ الولادة : </span>
            <span className="storage">دمشق , سوريا , 25/2/2004 </span>{/* ثابت */}
          </p>
        </div>
        <div className="header-center">
          <p className="text-lg font-semibold">العهدة الشخصية</p>
          <p className="info-center">
            <span className="black">رقم الغرفة :</span>
            <span className="storage"> {note?.room_id || "—"}</span>
          </p>
        </div>

        <div className="header-left">
          <p className="black">الجمهورية العربية السورية</p>
          <p className="gray">وزارة المالية</p>
          <p className="info-right">
            <span className="black">الرقم التسلسلي :</span>
            <span className="storage"> {note?.id || "—"}</span>
          </p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th rowSpan="2" className="center-text">
                الرقم التسلسلي
              </th>
              <th colSpan="3">المواد</th>
              <th colSpan="3" className="center-text">
                الاستلام
              </th>
              <th colSpan="3" class="center-text">
                الارجاع
              </th>
              <th rowSpan="2" className="center-text">
                ملاحظات
              </th>
            </tr>

            <tr>
              <th>كود المادة</th>
              <th>اسم المادة و الوصف</th>
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
            {Array.from({ length: 11 }).map((_, index) => {
              const item = note?.items?.[index]; 
              return (
              <tr key={item.id}>
                <td className="center-text">{index + 1}</td>
                <td>{item.product?.code}</td>
                <td>{item.product?.name}</td>
                <td>{item.product?.unit}</td>
                <td>{item.quantity}</td>
                <td>{note?.date?.slice(0, 10)}</td>
                <td>{item.exit_note_id}</td>
                <td>—</td> {/* ثابت */}
                <td>—</td> {/* ثابت */}
                <td>—</td> {/* ثابت */}
                <td className="center-text">{item.notes}</td>
              </tr>
              );
            })}
             {!note?.items?.length &&
              Array(11)
                .fill()
                .map((_, index) => (
                  <tr key={index}>
                    <td className="center-text">{index + 1}</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td className="center-text">—</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <p>
          <span className="grand_total">أمين المستودع:</span>
          <span className="price"> ملك مبارك</span>{/* ثابت */}
        </p>
        <p>
          <span className="grand_total"> المستلم:</span>
          <span className="price"> ملك مبارك</span>{/* ثابت */}
        </p>
      </div>

      <button className="creat" onClick={() => setShowConfirm(true)}>
        إنشاء عهدة شخصية
      </button>

      {showConfirm && (
        <div className="overlay">
          <div className="custom-modal" dir="rtl">
            <p className="first_line">تأكيد إنشاء عهدة شخصية</p>
            <p>
              <span>هل أنت متأكد ؟</span>
              <br />
              <span className="">
                بمجرد التأكيد، سيتم خصم المواد تلقائيًا من المخزون.
              </span>
            </p>

            <div className="modal-buttons">
              <button className="btn confirm" onClick={handleConfirm}>
                نعم
              </button>
              <button
                className="btn cancel"
                onClick={() => setShowConfirm(false)}
              >
                لا
              </button>
            </div>
            <p className="small-text"></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustodyNote;
