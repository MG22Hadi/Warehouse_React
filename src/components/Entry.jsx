import React from "react";
import "./Entry.css";

const EntryNote = ({ note }) => {
  return (
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
            {Array.from({ length: 11 }).map((_, index) => {
              const item = note.items?.[index]; // جرب جيب الصف من الداتا إذا موجود
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item ? item.product?.code : ""}</td>
                  <td>{item ? item.product?.name : ""}</td>
                  <td>{item ? item.product?.unit : ""}</td>
                  <td>{item ? item.quantity : ""}</td>
                  <td>{item ? item.notes : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default EntryNote;
