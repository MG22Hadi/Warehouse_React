import React from "react";
import "./Entry.css";
import { useTheme } from "@mui/material/styles";

const EntryNote = ({ note }) => {
  const theme = useTheme();

  return (
    <div className="container" dir="rtl">
      <div className="entry-header">
        <div className="top-right">
          <p>
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              {" "}
              رقم التسلسل:
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {" "}
              {note.serial_number}
            </span>
          </p>
          <p className="gray" style={{ color: theme.palette.text.secondary }}>
            {note.warehouse?.name || "—"}
          </p>
        </div>
        <div className="title">
          <p
            className="text-lg font-semibold"
            style={{ color: theme.palette.text.primary }}
          >
            مذكرة إدخال
          </p>
          <p className="Date">
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              {" "}
              التاريخ :
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {" "}
              {note.date?.slice(0, 10)}
            </span>
          </p>
        </div>
        <div className="top-left">
          <p className="black" style={{ color: theme.palette.text.primary }}>
            الجمهورية العربية السورية
          </p>
          <p className="gray" style={{ color: theme.palette.text.primary }}>
            وزارة المالية
          </p>
        </div>
      </div>

      <div
        className="table-wrapper"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <table>
          <thead>
            <tr>
              <th rowSpan="2" style={{ borderColor: theme.palette.divider }}>
                الرقم التسلسلي
              </th>
              <th colSpan="3" style={{ borderColor: theme.palette.divider }}>
                المواد
              </th>
              <th rowSpan="2" style={{ borderColor: theme.palette.divider }}>
                الكمية المستلمة
              </th>
              <th rowSpan="2" style={{ borderColor: theme.palette.divider }}>
                ملاحظات
              </th>
            </tr>
            <tr>
              <th>كود المادة</th>
              <th> اسم المادة والوصف</th>
              <th>الوحدة</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 11 }).map((_, index) => {
              const item = note.items?.[index];
              return (
                <tr
                  key={index}
                  style={{
                    borderColor: theme.palette.divider,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <td style={{ color: theme.palette.text.third }}>
                    {index + 1}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item ? item.product?.code : ""}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item ? item.product?.name : ""}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item ? item.product?.unit : ""}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item ? item.quantity : ""}
                  </td>
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
          <span
            className="price"
            style={{ color: theme.palette.text.secondary }}
          >
            {note.created_by?.name || "—"}
          </span>
        </p>
        <p>
          <span className="grand_total"> المستلم:</span>
          <span
            className="price"
            style={{ color: theme.palette.text.secondary }}
          >
            {note.user?.name || "—"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EntryNote;
