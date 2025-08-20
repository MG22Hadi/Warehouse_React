import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllNotesBox.css";

const AllCustodyBox = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/custody/showAll",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("📥 المذكرات:", response.data);
        setData(response.data.data || []);
      } catch (error) {
        console.error("فشل في جلب المذكرات", error);
      }
    };

    fetchNotes();
  }, []);

  const handleClick = (id) => {
    navigate(`/custody/specific/${id}`);
  };

  const handleCreateNote = () => {
    navigate("/CreateCustodyNote");
  };

  return (
    <div className="all-exit-box-container">
      <div className="create-note-button-wrapper">
        <button className="create-note-button" onClick={handleCreateNote}>
          إنشاء عهدة شخصية 
        </button>
      </div>

      <div className="cards-row">
        {data.length === 0 ? (
          <div className="no-data-message">
            <p>لا توجد عهد شخصية بعد</p>
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
                  <span className="value">{item.action}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllCustodyBox;
