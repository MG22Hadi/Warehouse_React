import React, { useState } from "react";
import "./Receiving.css";

const ReceivingNote = ({ note }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    console.log("تم تأكيد إنشاء المذكرة ");
    setShowConfirm(false);
  };

  return (
    <div className="container" dir="rtl">
      {/* ====== Header ====== */}
      <div className="header">
        <div className="top-right">
          <p>
            <span className="black"> رقم التسلسل:</span>
            <span className="storage"> {note.serial_number}</span>
          </p>
          <p className="gray">{note.warehouse?.name || "—"}</p>
        </div>
        <div className="title">
          <p className="text-lg font-semibold">مذكرة استلام</p>
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

      {/* ====== Table ====== */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th rowSpan="2" className="center-text">
                #
              </th>
              <th colSpan="3" className="center-text">
                المواد
              </th>
              <th rowSpan="2" className="center-text">
                الكمية المستلمة
              </th>
              <th rowSpan="2" className="center-text">
                سعر الواحدة
              </th>
              <th rowSpan="2" className="center-text">
                السعر الإجمالي
              </th>
              <th rowSpan="2" className="center-text">
                ملاحظات
              </th>
            </tr>
            <tr>
              <th className="center-text">كود المادة</th>
              <th className="center-text">اسم المادة</th>
              <th className="center-text">الوحدة</th>
            </tr>
          </thead>

          <tbody>
            {note.items?.map((item, index) => (
              <tr key={index}>
                <td className="center-text">{index + 1}</td>
                <td className="center-text">{item.product?.code}</td>
                <td className="center-text">{item.product?.name}</td>
                <td className="center-text">{item.product?.unit}</td>
                <td className="center-text">{item.quantity}</td>
                <td className="center-text">{item.unit_price}</td>
                <td className="center-text">
                  {item.unit_price && item.quantity
                    ? item.unit_price * item.quantity
                    : ""}
                </td>
                <td className="center-text">{item.notes || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====== Total ====== */}
      <div className="total">
        <span className="grand_total">الإجمالي:</span>
        <span className="price">
          {note.items?.reduce(
            (sum, item) =>
              sum +
              (item.unit_price && item.quantity
                ? item.unit_price * item.quantity
                : 0),
            0
          ) || 0}
        </span>
      </div>

      {/* ====== Footer ====== */}
      <div className="footer">
        <p>
          <span className="grand_total">أمين المستودع:</span>
          <span className="price">{note.created_by?.name || "—"}</span>
        </p>
        <p>
          <span className="grand_total"> المستلم:</span>
          <span className="price">{note.user?.name || "—"}</span>
        </p>
      </div>

      {/* ====== Confirm Button ====== */}
      <button className="creat" onClick={() => setShowConfirm(true)}>
        إنشاء مذكرة استلام
      </button>

      {showConfirm && (
        <div className="overlay">
          <div className="custom-modal" dir="rtl">
            <p className="first_line">تأكيد إنشاء مذكرة الاستلام</p>
            <p>
              هل أنت متأكد؟ <br />
              <span>بمجرد التأكيد، سيتم خصم المواد تلقائيًا من المخزون.</span>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivingNote;
