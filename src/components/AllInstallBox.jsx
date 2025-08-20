import React from "react";
import { useNavigate } from "react-router-dom";
import "./AllNotesBox.css";

const data = [];

for (let i = 1; i <= 4; i++) {
  const isEven = i % 2 === 0;
  data.push({
    serial: `OUT-2024-00${i}`,
    date: "2024-05-20",
    count: 5,
    recipient: "نور",
    action: isEven ? "شراء" : "استخدام من المستودع",
    link: isEven ? "/InstallReportsUser" : "/InstallReportsStore",
  });
}

const AllInstallBox = () => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
  };

  const handleCreateNote = () => {
    navigate("/CreateExitNote");
  };

  return (
    <div className="all-exit-box-container">
      <div className="create-note-button-wrapper">
        <button className="create-note-button" onClick={handleCreateNote}>
        انشاء ضبط تركيب
        </button>
      </div>

      <div className="cards-row">
        {data.map((item, index) => (
          <div
            key={index}
            className={`card ${index % 2 === 0 ? "bg-white" : "bg-gray"} clickable`}
            onClick={() => handleClick(item.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleClick(item.link);
            }}
          >
            <div className="card-content">
              <div className="info-item">
                <span className="label">الرقم</span>
                <span className="value">{item.serial}</span>
              </div>
              <div className="info-item">
                <span className="label">التاريخ</span>
                <span className="value">{item.date}</span>
              </div>
              <div className="info-item">
                <span className="label">العدد</span>
                <span className="value">{item.count}</span>
              </div>
              <div className="info-item">
                <span className="label">المستلم</span>
                <span className="value">{item.recipient}</span>
              </div>
              <div className="info-item">
                <span className="label">الحالة</span>
                <span className="value">{item.action}</span>
              </div>
            </div>
          </div>
        ))}
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
//           "http://localhost:8000/api/allInstallNotes",
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
