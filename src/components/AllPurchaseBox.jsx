import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import "./AllNotesBox.css";

const AllPurchaseBox = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/purchase-requests/my-requests",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("📥 الطلبات:", response.data);
        setData(response.data.data.purchase_requests || []);
      } catch (error) {
        console.error("فشل في جلب الطلبات", error);
      }
    };

    fetchNotes();
  }, []);

  const handleClick = (id) => {
    navigate(`/PurchaseRequests/${id}`);
  };

  const handleCreateNote = () => {
    navigate("/CreatePurchaseNote");
  };

  return (
    <div className="all-exit-box-container">
      <div className="create-note-button-wrapper">
        <button className="create-note-button" onClick={handleCreateNote}>
          إنشاء طلب شراء
        </button>
      </div>

      <div className="cards-row">
        {data.length === 0 ? (
          <div className="no-data-message">
            <p>لا توجد طلبات شراء بعد</p>
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
              style={{
                color: theme.palette.text.primary,
                backgroundColor:
                  index % 2 === 0
                    ? theme.palette.background.note1
                    : theme.palette.background.note2,
              }}
            >
              <div className="card-content">
                <div className="info-item">
                  <span
                    className="label"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    الرقم
                  </span>
                  <span
                    className="value"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {item.serial_number}
                  </span>
                </div>
                <div className="info-item">
                  <span
                    className="label"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    التاريخ
                  </span>
                  <span
                    className="value"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {item.date?.slice(0, 10)}
                  </span>
                </div>
                <div className="info-item">
                  <span
                    className="label"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    العدد
                  </span>
                  <span
                    className="value"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {item.items_count}
                  </span>
                </div>
                <div className="info-item">
                  <span
                    className="label"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    المستلم
                  </span>
                  <span
                    className="value"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {item.user?.name || "—"}
                  </span>
                </div>
                <div className="info-item">
                  <span
                    className="label"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    الحالة
                  </span>
                  <span
                    className="value"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {item.action}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPurchaseBox;
