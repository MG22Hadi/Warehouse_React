import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllNotesBox.css";
import { Button } from "@mui/material";
// import CreateReceivingNote from "./CreateReceivingNote"; // إذا عندك مكون إنشاء

const AllReceivingBox = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/allReceivingNote",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("📦 مذكرات الاستلام:", response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("فشل في جلب مذكرات الاستلام", error);
      }
    };

    fetchNotes();
  }, []);

  const handleClick = (id) => {
    navigate(`/ReceivingNotes/${id}`);
  };

  return (
    <div className="all-exit-box-container">
      <div className="create-note-button-wrapper">
        <button className="create-note-button" onClick={() => setOpen(true)}>
          إنشاء مذكرة استلام
        </button>
        {/* هون لو عامل مكون خاص بالإنشاء ضيفه */}
        {/* <CreateReceivingNote open={open} onClose={() => setOpen(false)} /> */}
      </div>

      <div className="cards-row">
        {data.length === 0 ? (
          <div className="no-data-message">
            <p>لا توجد مذكرات استلام بعد</p>
          </div>
        ) : (
          data.map((item, index) => (
            <div
              key={item.id}
              className={`card ${
                index % 2 === 0 ? "bg-white" : "bg-gray"
              } clickable`}
              onClick={() => handleClick(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleClick(item.id);
              }}
            >
              <div className="card-content">
                <div className="info-item">
                  <span className="label">الرقم</span>
                  <span className="value">{item.serial_number}</span>
                </div>
                <div className="info-item">
                  <span className="label">التاريخ</span>
                  <span className="value">{item.date?.slice(0, 10)}</span>
                </div>
                <div className="info-item">
                  <span className="label">العدد</span>
                  <span className="value">{item.items_count}</span>
                </div>
                <div className="info-item">
                  <span className="label">المستلم</span>
                  <span className="value">{item.user?.name || "—"}</span>
                </div>
                <div className="info-item">
                  <span className="label">الحالة</span>
                  <span className="value">مذكرة استلام</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllReceivingBox;
