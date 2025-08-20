import React from "react";
import "../components/NotificationBox.css";
import MainLayout from "../MainLayout.jsx";

const AllUserRequests = ({ mode, toggleTheme }) => {
  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="طلبات من المستخدمين">
      <div className="notification-container">
        <div className="left-side" style={{ margin: '0 auto', maxWidth: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>طلبات من المستخدمين</h2>
          </div>
          <div className="orders-grid">
            {Array(12).fill().map((_, i) => {
              const row = Math.floor(i / 2);
              const col = i % 2;
              const isOrange = (row % 2 === 0 && col === 0) || (row % 2 === 1 && col === 1);
              return (
                <div
                  className="order-card"
                  style={{ backgroundColor: isOrange ? "#FFF4EA" : "#F5F5F5" }}
                  key={i}
                >
                  <div className="order-header">
                    <span className="order-type">📄  طلب مواد</span>
                    <span className="order-id">#طلب-2025-00{i+1}</span>
                  </div>
                  <div className="divider1"></div>
                  <div className="order-info">
                    <p><strong>من:</strong> علي محمود</p>
                    <p className="order-id1">عدد المواد: 3</p>
                    <p className="order-id1">المستودع: دشمق </p>
                  </div>
                  <div className="order-actions">
                    <button className="view-btn">▼ عرض التفاصيل</button>
                    {i % 2 === 1 ? (
                      <button className="approve-btn">موافقة ✅</button>
                    ) : (
                      <button className="deny-btn">رفض ❌</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AllUserRequests;
