import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

export default function ScrapNoteManager() {
  const theme = useTheme();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/scrapNote/${id}/details`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("📌 تفاصيل المذكرة:", response.data);
        setNote(response.data.data);
      } catch (error) {
        console.error("فشل في جلب تفاصيل المذكرة", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleApprove = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/scrapNotes/${id}/approve`,
        {}, // body فاضي
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      console.log(" موافقة:", response.data);
      navigate("/Manager");
    } catch (error) {
      console.error(" خطأ في الموافقة:", error);
      alert("فشل في الموافقة على المذكرة");
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/scrapNotes/${id}/reject`,
        { rejection_reason: "اكل هوا" },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      console.log(" رفض:", response.data);
      navigate("/Manager");
    } catch (error) {
      console.error(" خطأ في الرفض:", error);
      alert("فشل في رفض المذكرة");
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <p style={{ color: theme.palette.text.primary }}>
          جاري تحميل البيانات...
        </p>
      </div>
    );
  }

  if (!note) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <p style={{ color: theme.palette.text.primary }}>
          لا يوجد تفاصيل لعرضها
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full p-8 flex items-center justify-center"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      <div
        className="w-full max-w-7xl  rounded-[20px] p-8 shadow-lg"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
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
                  {note.serial_number || ""}
                </span>
              </p>
              <p
                className="gray"
                style={{ color: theme.palette.text.secondary }}
              >
                {note.warehouse?.name || "—"}
              </p>
            </div>
            <div className="title">
              <p
                className="text-lg font-semibold"
                style={{ color: theme.palette.text.primary }}
              >
                مذكرة اتلاف
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
              <p
                className="black"
                style={{ color: theme.palette.text.primary }}
              >
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
              borderColor: theme.palette.divider,
            }}
          >
            <table
              style={{ backgroundColor: theme.palette.background.default }}
            >
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
                    style={{ borderColor: theme.palette.divider }}
                  >
                    المواد
                  </th>
                  <th
                    rowSpan="2"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    الكمية
                  </th>
                  <th
                    rowSpan="2"
                    className="center-text"
                    style={{ borderColor: theme.palette.divider }}
                  >
                    الملاحظات
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
                  const item = note.materials?.[index];
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

          <div className="footer">
            <p>
              <span className="grand_total">أمين المستودع:</span>
              <span
                className="price"
                style={{ color: theme.palette.text.secondary }}
              >
                {" "}
                {note.created_by?.name || "—"}
              </span>
            </p>
          </div>
        </div>
        {/* أزرار الموافقة والرفض */}
        {note.status !== "approved" && note.status !== "rejected" && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handleReject}
              className="bg-[#EB001B] text-white font-bold py-2 px-10 rounded-lg hover:bg-[#b30015] transition-colors duration-300"
            >
              رفض
            </button>
            <button
              onClick={handleApprove}
              className="bg-[#28A745] text-white font-bold py-2 px-10 rounded-lg hover:bg-[#218838] transition-colors duration-300"
            >
              موافقة
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
