import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationBox.css";

const NotificationBox = () => {
  const navigate = useNavigate();
  return (
    <div className="notification-container"> {/* خلفية بيضاء لكل الصفحة */}
      <div className="notification-page">

        {/* الجهة اليسرى: البطاقات */}
        <div className="left-side">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>طلبات من المستخدمين</h2>
            <button
              className="all-requests-btn"
              onClick={() => navigate("/AllUserRequests")}
            >
              عرض كل طلبات المستخدمين
            </button>
          </div>
          <div className="orders-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
  {Array(6).fill().map((_, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const isOrange = (row % 2 === 0 && col === 0) || (row % 2 === 1 && col === 1); 

    return (
      <div
        className="order-card"
        key={i}
        style={{
          backgroundColor: isOrange ? "#FFF4EA" : "#F5F5F5",
          padding: '1rem',
          borderRadius: '12px',
          width: '100%', // الكارت ياخد كل عرض العمود
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          minHeight: '150px', // ممكن تزود حسب المحتوى
        }}
      >
        <div className="order-header">
          <span className="order-type">📄  طلب مواد</span>
          <span className="order-id">#طلب-2025-001</span>
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
            <button className="approve-btn">موافقة </button>
          ) : (
            <button className="deny-btn">رفض</button>
          )}
        </div>
      </div>
    );
  })}
</div>

        </div>

        {/* الخط الرمادي */}
        <div className="divider"></div>

        {/* الجهة اليمنى: تنبيهات المخزون */}
<div className="right-side">
  <h2 className="section-title"> تنبيهات انخفاض المخزون</h2>
  <p style={{ color: "gray", marginBottom: "1rem" }}>
    بعض المواد منخفضة المخزون، يرجى اتخاذ إجراء:
  </p>
{[...Array(3)].map((_, i) => (
  <div style={{ marginBottom: "20px" }} key={i}>
    <div
      className="order-card"
      style={{ backgroundColor: i % 2 === 0 ? "#F5F5F5" : "#FFF4EA" }}
    >
      <div className="order-header">
        <span className="order-type"> تنبيه: مادة منخفضة</span>
      </div>

      <div className="order-info" style={{ marginTop: "10px" }}>
        <p>
          <span className="strong">الصنف:</span>{" "}
          <span className="order-id1">لابتوب HP</span>
        </p>
        <p>
          <span className="strong">الرمز:</span>{" "}
          <span className="order-id1">ITM-2024-001</span>
        </p>
        <p>
          <span className="strong">المخزن:</span>{" "}
          <span className="order-id1">التخزين التقني</span>
        </p>
        <p>
          <span className="strong">الكمية المتبقية:</span>{" "}
          <span className="order-id1">فقط 2</span>
        </p>
      </div>

      <div className="order-actions">
        <button className="view-btn">🛒 اطلب الآن</button>
        <button className="deny-btn"> تجاهل</button>
      </div>
    </div>
  </div>
))}

</div>

      </div>
    </div>
  );
};

export default NotificationBox;
