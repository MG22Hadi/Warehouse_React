import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllNotesBox.css";
import { useTheme } from "@mui/material/styles";

const AllInstallReportsBox = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/allInstallationReport?type=stock_usage",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data.data.reports);
      } catch (error) {
        console.error("خطأ في جلب بيانات استخدام المستودع:", error);
      }
    };
    fetchData();
  }, [token]);

  const handleClick = (id) => {
    navigate(`/InstallReportsUser/${id}`);
  };

  // const handleCreateNote1 = () => {
  //   navigate("/CreateInstallBuyNote");
  // };

  const handleCreateNote2 = () => {
    navigate("/CreateInstallmosNote");
  };
  return (
    <div
      className="all-exit-box-container"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className="create-note-button-wrapper">
        <button className="create-note-button" onClick={handleCreateNote2}>
          ضبط تركيب من المستودع
        </button>
      </div>

      <div className="cards-row">
        {data.length === 0 ? (
          <div className="no-data-message">
            <p>لا توجد مذكرات تركيب خاصة بالمستودع بعد</p>
          </div>
        ) : (
          data.map((item, index) => (
            <div
              key={item.id}
              className={`card ${
                index % 2 === 0 ? "bg-white" : "bg-gray"
              } clickable`}
              onClick={() => handleClick(item.id)}
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
                    {item.materials_count ?? 0}
                  </span>
                </div>
                <div className="info-item">
                  <span
                    className="label"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    المدير
                  </span>
                  <span
                    className="value"
                    style={{ color: theme.palette.text.primary }}
                  >
                   {item.manager?.name || "--"}
                    {/* {typeof item.created_by === "object"
                      ? item.created_by?.name
                      : item.created_by} */}
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
                    {item.status}
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

export default AllInstallReportsBox;
