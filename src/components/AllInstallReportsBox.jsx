import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllNotesBox.css";

const AllInstallReportsBox = () => {
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
    <div className="all-exit-box-container">
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
                  <span className="value">{item.materials_count ?? 0}</span>
                </div>
                <div className="info-item">
                  <span className="label">المستلم</span>
                  <span className="value">
                    {typeof item.created_by === "object"
                      ? item.created_by?.name
                      : item.created_by}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">الحالة</span>
                  <span className="value">{item.status}</span>
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
