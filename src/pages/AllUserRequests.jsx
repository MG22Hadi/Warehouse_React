import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/NotificationBox.css";
import MainLayout from "../MainLayout.jsx";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const AllUserRequests = ({ mode, toggleTheme }) => {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // تحميل الطلبات
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/allRequestMaterial",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setOrders(res.data.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    fetchOrders();
  }, []);

  // عند الضغط على طلب → جيب التفاصيل
  const handleViewDetails = async (orderId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/M-Request/show/${orderId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setSelectedOrder(res.data.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching order details", err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCreateExitNote = () => {
    navigate("/CreateExitNote", { state: { orderId: selectedOrder.id } });
  };

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
      pageTitle="طلبات من المستخدمين"
    >
      <div
        className="notification-container"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div
          className="left-side"
          style={{ margin: "0 auto", maxWidth: "100%" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <h2 className="section-title" style={{ margin: 0 }}>
              طلبات من المستخدمين
            </h2>
          </div>
          <div className="orders-grid">
            {orders.map((order, index) => {
              return (
                <div
                  className="order-card"
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? theme.palette.background.car
                        : theme.palette.background.car1,
                  }}
                  key={order.id}
                >
                  <div className="order-header">
                    <span className="order-type">📄 طلب مواد</span>
                    <span
                      className="order-id"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      {order.serial_number}
                    </span>
                  </div>
                  <div className="divider1"></div>
                  <div className="order-info">
                    <p>
                      <strong style={{ color: theme.palette.text.primary }}>
                        من:
                      </strong>{" "}
                      <span style={{ color: theme.palette.text.secondary }}>
                        {order.requested_by?.name}
                      </span>
                    </p>
                    <p
                      className="order-id1"
                      style={{ color: theme.palette.text.primary }}
                    >
                      الحالة:{" "}
                      <span style={{ color: theme.palette.text.secondary }}>
                        {order.status}
                      </span>
                    </p>
                    <p
                      className="order-id1"
                      style={{ color: theme.palette.text.primary }}
                    >
                      التاريخ:{" "}
                      <span style={{ color: theme.palette.text.secondary }}>
                        {new Date(order.date).toLocaleDateString("ar-SY")}
                      </span>
                    </p>
                  </div>
                  <div className="order-actions">
                    <button
                      className="view-btn"
                      onClick={() => handleViewDetails(order.id)}
                      style={{ color: theme.palette.text.primary }}
                    >
                      ▼ عرض التفاصيل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* المودال */}
      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className=" rounded-lg shadow-xl p-6 w-full max-w-7xl mx-4"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            style={{ backgroundColor: theme.palette.background.paper }}
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-green-600">
                {selectedOrder.status === "approved"
                  ? "✅ تم الموافقة على طلبك"
                  : "⌛ بانتظار الموافقة"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-2xl font-light"
              >
                &times;
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                تفاصيل المواد المطلوبة:
              </h3>
              <div className="flex justify-center">
                <div>
                  <table className="w-full table-fixed border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-right text-xs font-medium text-white uppercase">
                          كود
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-white uppercase">
                          المنتج
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase">
                          الكمية المطلوبة
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase">
                          الكمية الموافق عليها
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr
                          key={index}
                          style={{
                            borderColor: theme.palette.divider,
                            backgroundColor: theme.palette.background.default,
                          }}
                        >
                          <td
                            className="px-4 py-2 text-sm break-words"
                            style={{ color: theme.palette.text.third }}
                          >
                            {item.product.code}
                          </td>
                          <td
                            className="px-4 py-2 text-sm break-words"
                            style={{ color: theme.palette.text.third }}
                          >
                            {item.product.name}
                          </td>
                          <td
                            className="px-4 py-2 text-sm text-center"
                            style={{ color: theme.palette.text.third }}
                          >
                            {item.quantity_requested}
                          </td>
                          <td
                            className="px-4 py-2 text-sm text-center"
                            style={{ color: theme.palette.text.third }}
                          >
                            {item.quantity_approved}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreateExitNote}
                className="text-[#FF8E29] font-bold py-2 px-6 rounded-lg hover:text-[#e07a1b] transition"
              >
                إنشاء مذكرة إخراج
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AllUserRequests;
