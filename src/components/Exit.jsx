import React from "react";
import "./Exit.css";
import { useTheme } from "@mui/material/styles";

const ExitNote = ({ note }) => {
  const theme = useTheme();

  return (
    <div className="container" dir="rtl">
      <div className="header">
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
            {note.warehouse?.name ?? "—"}
          </p>
        </div>
        <div className="title">
          <p
            className="text-lg font-semibold"
            style={{ color: theme.palette.text.primary }}
          >
            مذكرة إخراج
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
              {new Date(note.date).toLocaleDateString("ar-EG")}
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
              <th
                rowSpan="2"
                className="center-text"
                style={{ borderColor: theme.palette.divider }}
              >
                #
              </th>
              <th colSpan="3">المواد</th>
              <th
                rowSpan="2"
                className="center-text"
                style={{ borderColor: theme.palette.divider }}
              >
                الكمية المستلمة
              </th>
              <th
                rowSpan="2"
                className="center-text"
                style={{ borderColor: theme.palette.divider }}
              >
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
                <tr
                  key={index}
                  style={{
                    borderColor: theme.palette.divider,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {index + 1}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.code}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.name}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.description}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item.notes ?? "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center"
                  style={{ borderColor: theme.palette.divider }}
                >
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
          <span
            className="price"
            style={{ color: theme.palette.text.secondary }}
          >
            {note.created_by?.name ?? "—"}
          </span>
        </p>
        <p>
          <span className="grand_total">المستلم:</span>
          <span
            className="price"
            style={{ color: theme.palette.text.secondary }}
          >
            {note.user?.name ?? "—"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ExitNote;
