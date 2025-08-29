import React from "react";
import { useTheme } from "@mui/material/styles";
import "./InstallUser.css";


const InstallUser = ({ report }) => {
  const theme = useTheme();

  return (
    <div className="container mx-auto mt-8 px-4" dir="rtl">
      {/* ===== Header ===== */}
      <div className="header">
        <div className="header-right">
          <p>
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              رقم التسلسل:
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {report.serial_number}
            </span>
          </p>
          <p>
            <span
              className="black2"
              style={{ color: theme.palette.text.primary }}
            >
              موقع التركيب :
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {report.location}
            </span>
          </p>
        </div>

        <div className="header-center">
          <p
            className="text-lg font-semibold"
            style={{ color: theme.palette.text.primary }}
          >
            ضبط التركيب
          </p>
          <p className="info-center">
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              التاريخ :
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {report.date?.slice(0, 10)}
            </span>
          </p>
        </div>

        <div className="header-left">
          <p className="black" style={{ color: theme.palette.text.primary }}>
            الجمهورية العربية السورية
          </p>
          <p className="gray" style={{ color: theme.palette.text.primary }}>
            وزارة المالية
          </p>
          <p className="info-right">
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              النوع :
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {report.type_name}
            </span>
          </p>
        </div>
      </div>

      {/* ===== Table ===== */}
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
                الرقم التسلسلي
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
              <th>اسم المادة و الوصف</th>
              <th>الوحدة</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 11 }).map((_, index) => {
              const mat = report.materials?.[index];
              return (
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
                    {mat ? mat.product_id || "—" : ""}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {mat ? mat.product_name : ""}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {mat ? mat.unit || "—" : ""}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {mat ? mat.quantity : ""}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {mat ? mat.notes : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p>
          <span className="grand_total">أمين المستودع:</span>
          <span
            className="price"
            style={{ color: theme.palette.text.secondary }}
          >
            {report.created_by?.name || "—"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InstallUser;
