import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllNotesBox.css";
import { useTheme } from "@mui/material/styles";
import { BASE_URL } from "../api/axiosInstance";

const AllInstallBox = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/allInstallationReport`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data.reports);
      } catch (error) {
        console.error("فشل في جلب مذكرات التركيب:", error);
      }
    };

    fetchNotes();
  }, [token]);

  const handleClick = (id, type) => {
    if (type === "purchase") {
      navigate(`/InstallReportsStore/${id}`);
    } else if (type === "stock_usage") {
      navigate(`/InstallReportsUser/${id}`);
    } else {
      console.warn("نوع التقرير غير معروف:", type);
    }
  };

  const handleCreateInstallmosNote = () => {
    navigate("/CreateInstallmosNote");
  };

  const handleCreateInstallBuyNote = () => {
    navigate("/CreateInstallBuyNote");
  };

  return (
    <div
      className="all-exit-box-container"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className="flex justify-end gap-4">
        <button
          className="create-note-button"
          onClick={handleCreateInstallBuyNote}
        >
          ضبط تركيب شراء
        </button>
        <button
          className="create-note-button"
          onClick={handleCreateInstallmosNote}
        >
          ضبط تركيب من المستودع
        </button>
      </div>

      <div className="cards-row">
        {data.length === 0 ? (
          <div className="no-data-message">
            <p>لا توجد مذكرات تركيب بعد</p>
          </div>
        ) : (
          data.map((item, index) => (
            <div
              key={item.id}
              className={`card ${
                index % 2 === 0 ? "bg-white" : "bg-gray"
              } clickable`}
              onClick={() => handleClick(item.id, item.type)}
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
                    {item.materials ? item.materials.length : 0}
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

export default AllInstallBox;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AllNotesBox.css";

// const AllInstallBox = () => {
//   const [data, setData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/allInstallationReport",
//           {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("🔧 ضبط التركيب:", response.data);
//         setData(response.data.data);
//       } catch (error) {
//         console.error("فشل في جلب مذكرات التركيب", error);
//       }
//     };

//     fetchNotes();
//   }, []);

//   const handleClick = (id) => {
//     navigate(`/InstallNotes/${id}`);
//   };

//   return (
//     <div className="all-exit-box-container">
//       <div className="create-note-button-wrapper">
//         <button className="create-note-button" onClick={() => setOpen(true)}>
//           إنشاء ضبط تركيب
//         </button>
//         {/* هون تقدر تستعمل CreateInstallNote لو عندك */}
//         {/* <CreateInstallNote open={open} onClose={() => setOpen(false)} /> */}
//       </div>

//       <div className="cards-row">
//         {data.length === 0 ? (
//           <div className="no-data-message">
//             <p>لا توجد مذكرات تركيب بعد</p>
//           </div>
//         ) : (
//           data.map((item, index) => (
//             <div
//               key={item.id}
//               className={`card ${
//                 index % 2 === 0 ? "bg-white" : "bg-gray"
//               } clickable`}
//               onClick={() => handleClick(item.id)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleClick(item.id);
//               }}
//             >
//               <div className="card-content">
//                 <div className="info-item">
//                   <span className="label">الرقم</span>
//                   <span className="value">{item.serial_number}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">التاريخ</span>
//                   <span className="value">{item.date?.slice(0, 10)}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">العدد</span>
//                   <span className="value">{item.items_count}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">المستلم</span>
//                   <span className="value">{item.user?.name || "—"}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">الحالة</span>
//                   <span className="value">ضبط تركيب</span>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllInstallBox;
