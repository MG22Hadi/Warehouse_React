import React, { useState } from "react";
import "./Custody.css";
import { useTheme } from "@mui/material/styles";

const CustodyNote = (note) => {
  const theme = useTheme(); 
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="container" dir="rtl">
      <div className="header">
        <div className="header-right">
          <p>
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              الرقم الوطني:
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {" "}
              12345678
            </span>
            {/* ثابت */}
          </p>
          <p>
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              {" "}
              رقم الموبايل:{" "}
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              515930295847562
            </span>
            {/* ثابت */}
          </p>

          <p>
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              {" "}
              مكان وتاريخ الولادة :{" "}
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              دمشق , سوريا , 25/2/2004{" "}
            </span>
            {/* ثابت */}
          </p>
        </div>
        <div className="header-center">
          <p
            className="text-lg font-semibold"
            style={{ color: theme.palette.text.primary }}
          >
            العهدة الشخصية
          </p>
          <p className="info-center">
            <span
              className="black"
              style={{ color: theme.palette.text.primary }}
            >
              رقم الغرفة :
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {" "}
              {note?.room_id || "—"}
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
              الرقم التسلسلي :
            </span>
            <span
              className="storage"
              style={{ color: theme.palette.text.secondary }}
            >
              {" "}
              {note?.id || "—"}
            </span>
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
                الرقم التسلسلي
              </th>
              <th colSpan="3" style={{ borderColor: theme.palette.divider }}>
                المواد
              </th>
              <th
                colSpan="3"
                className="center-text"
                style={{ borderColor: theme.palette.divider }}
              >
                الاستلام
              </th>
              <th
                colSpan="3"
                class="center-text"
                style={{ borderColor: theme.palette.divider }}
              >
                الارجاع
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
                  <td
                    className="center-text"
                    style={{
                      borderColor: theme.palette.divider,
                      backgroundColor: theme.palette.background.default,
                    }}
                  >
                    {index + 1}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.product?.code}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.product?.name}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.product?.unit}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.quantity}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {note?.date?.slice(0, 10)}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>
                    {item.exit_note_id}
                  </td>
                  <td style={{ color: theme.palette.text.third }}>—</td>{" "}
                  {/* ثابت */}
                  <td style={{ color: theme.palette.text.third }}>—</td>{" "}
                  {/* ثابت */}
                  <td style={{ color: theme.palette.text.third }}>—</td>{" "}
                  {/* ثابت */}
                  <td
                    className="center-text"
                    style={{ color: theme.palette.text.third }}
                  >
                    {item.notes}
                  </td>
                </tr>
              );
            })}
            {!note?.items?.length &&
              Array(11)
                .fill()
                .map((_, index) => (
                  <tr key={index}>
                    <td
                      className="center-text"
                      style={{ color: theme.palette.text.third }}
                    >
                      {index + 1}
                    </td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td style={{ color: theme.palette.text.third }}>—</td>
                    <td
                      className="center-text"
                      style={{ color: theme.palette.text.third }}
                    >
                      —
                    </td>
                  </tr>
                ))}
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
            {" "}
            ملك مبارك
          </span>
          {/* ثابت */}
        </p>
        <p>
          <span className="grand_total"> المستلم:</span>
          <span
            className="price"
            style={{ color: theme.palette.text.secondary }}
          >
            {" "}
            ملك مبارك
          </span>
          {/* ثابت */}
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
