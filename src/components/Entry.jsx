import React from "react";
import "./Entry.css";

const EntryNote = ({ note }) => {
  return (
    <div className="container" dir="rtl">
      <div className="header">
        <div className="top-right">
          <p>
            <span className="black"> رقم التسلسل:</span>
            <span className="storage"> {note.serial_number}</span>
          </p>
          <p className="gray">{note.warehouse?.name || "—"}</p>
        </div>
        <div className="title">
          <p className="text-lg font-semibold">مذكرة إدخال</p>
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
            {note.items && note.items.length > 0 ? (
              note.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product?.code}</td>
                  <td>{item.product?.name}</td>
                  <td>{item.product?.unit || "—"}</td>
                  <td>{item.quantity}</td>
                  <td>{item.notes || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">لا توجد مواد</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="total">
        <span className="grand_total">الإجمالي:</span>
        <span className="price">{note.total || "—"}</span>
      </div>

      <div className="footer">
        <p>
          <span className="grand_total">أمين المستودع:</span>
          <span className="price">{note.user?.name || "—"}</span>
        </p>
        <p>
          <span className="grand_total"> المستلم:</span>
          <span className="price">{note.recipient || "—"}</span>
        </p>
      </div>
    </div>
  );
};

export default EntryNote;
