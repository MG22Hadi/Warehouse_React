import React from "react";
import "./Exit.css";

const ExitNote = ({ note }) => {
  return (
    <div className="container" dir="rtl">
      <div className="header">
        <div className="top-right">
          <p>
            <span className="black"> رقم التسلسل:</span>
            <span className="storage"> {note.serial_number}</span>
          </p>
          <p className="gray">{note.warehouse?.name ?? "—"}</p>
        </div>
        <div className="title">
          <p className="text-lg font-semibold">مذكرة إخراج</p>
          <p className="Date">
            <span className="black"> التاريخ :</span>
            <span className="storage">
              {new Date(note.date).toLocaleDateString("ar-EG")}
            </span>
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
              <th rowSpan="2" className="center-text">
                #
              </th>
              <th colSpan="3">المواد</th>
              <th rowSpan="2" className="center-text">
                الكمية المستلمة
              </th>
              <th rowSpan="2" className="center-text">
                ملاحظات
              </th>
            </tr>
            <tr>
              <th>كود المادة</th>
              <th>اسم المادة</th>
              <th>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {note.items && note.items.length > 0 ? (
              note.items.map((item, index) => (
                <tr key={index}>
                  <td className="center-text">{index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className="center-text">{item.quantity}</td>
                  <td className="center-text">{item.notes ?? "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  لا توجد مواد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <p>
          <span className="grand_total">أمين المستودع:</span>
          <span className="price">{note.created_by?.name ?? "—"}</span>
        </p>
        <p>
          <span className="grand_total">المستلم:</span>
          <span className="price">{note.user?.name ?? "—"}</span>
        </p>
      </div>
    </div>
  );
};

export default ExitNote;
