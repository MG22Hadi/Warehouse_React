import React from "react";
import { useTheme } from "@mui/material/styles";
import "./InstallUser.css";

const InstallStore = ({ report }) => {
  const theme = useTheme();

  return (
    <div className="container" dir="rtl">
      {/* ===== Header ===== */}
      <div className="header">
        <div className="header-right">
          <p>
            <span className="black">رقم التسلسل:</span>
            <span className="storage">{report.serial_number}</span>
          </p>
          <p className="gray">{report.location || "—"}</p>
          <p>
            <span className="black2">موقع التركيب :</span>
            <span className="storage">{report.location}</span>
          </p>
        </div>

        <div className="header-center">
          <p className="text-lg font-semibold">ضبط التركيب</p>
          <p className="info-center">
            <span className="black">التاريخ :</span>
            <span className="storage">{report.date?.slice(0, 10)}</span>
          </p>
        </div>

        <div className="header-left">
          <p className="black">الجمهورية العربية السورية</p>
          <p className="gray">وزارة المالية</p>
          <p className="info-right">
            <span className="black">النوع :</span>
            <span className="storage">{report.type_name}</span>
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
              <th rowSpan="2" className="center-text">
                الرقم التسلسلي
              </th>
              <th colSpan="3">المواد</th>
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
              <th>كود المادة</th>
              <th>اسم المادة و الوصف</th>
              <th>الوحدة</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 11 }).map((_, index) => {
              const mat = report.materials?.[index];
              return (
                <tr key={index}>
                  <td className="center-text">{index + 1}</td>
                  <td>{mat ? mat.product_id || "—" : ""}</td>
                  <td>{mat ? mat.product_name : ""}</td>
                  <td>{mat ? mat.unit || "—" : ""}</td>
                  <td>{mat ? mat.quantity : ""}</td>
                  <td>{mat ? mat.unit_price : ""}</td>
                  <td>{mat ? mat.total_price : ""}</td>
                  <td>{mat ? mat.notes : ""}</td>
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
          <span className="price">{report.created_by?.name || "—"}</span>
        </p>
        <p>
          <span className="grand_total">المستلم:</span>
          <span className="price">{report.approved_by?.name || "—"}</span>
        </p>
      </div>
    </div>
  );
};

export default InstallStore;
