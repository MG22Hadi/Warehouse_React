import React, { useState } from "react";
import "./Receiving.css";
import { useTheme } from "@mui/material/styles";

const ReceivingNote = ({ note }) => {
  const theme = useTheme();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    console.log("تم تأكيد إنشاء المذكرة ");
    setShowConfirm(false);
  };

  return (
    <div className="container mx-auto mt-8 px-4" dir="rtl">
      {/* ====== Header ====== */}
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
            {note.warehouse?.name || "—"}
          </p>
        </div>
        <div className="title">
          <p
            className="text-lg font-semibold"
            style={{ color: theme.palette.text.primary }}
          >
            مذكرة استلام
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

      {/* ====== Table ====== */}
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
              <th
                colSpan="3"
                className="center-text"
                style={{ borderColor: theme.palette.divider }}
              >
                المواد
              </th>
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
                سعر الواحدة
              </th>
              <th
                rowSpan="2"
                className="center-text"
                style={{ borderColor: theme.palette.divider }}
              >
                السعر الإجمالي
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
              <th className="center-text">كود المادة</th>
              <th className="center-text">اسم المادة</th>
              <th className="center-text">الوحدة</th>
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
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item ? item.product?.code : ""}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item ? item.product?.name : ""}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item ? item.product?.unit : ""}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item ? item.quantity : ""}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item ? item.unit_price : ""}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item && item.unit_price && item.quantity
                      ? item.unit_price * item.quantity
                      : ""}
                  </td>
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item ? item.notes : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ====== Total ====== */}
      <div className="total">
        <span
          className="grand_total"
          style={{ color: theme.palette.text.primary }}
        >
          الإجمالي:
        </span>
        <span className="price" style={{ color: theme.palette.text.secondary }}>
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
            {note.supplier?.name || "—"}
          </span>
        </p>
      </div>

      {/* ====== Confirm Button ======
      <button className="creat" onClick={() => setShowConfirm(true)}>
        إنشاء مذكرة استلام
      </button>

      {showConfirm && (
        <div className="overlay">
          <div className="custom-modal" dir="rtl">
            <p
              className="first_line"
              style={{ color: theme.palette.text.primary }}
            >
              تأكيد إنشاء مذكرة الاستلام
            </p>
            <p style={{ color: theme.palette.text.secondary }}>
              هل أنت متأكد؟ <br />
              <span style={{ color: theme.palette.text.secondary }}>
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
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ReceivingNote;
