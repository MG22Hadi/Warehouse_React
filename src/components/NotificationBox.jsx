import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationBox.css";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const NotificationBox = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // --- حالات جديدة لوضع التعديل والبيانات المؤقتة ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempProducts, setTempProducts] = useState([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setIsEditMode(false); // إعادة تعيين وضع التعديل عند الإغلاق
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/markAsRead-allNotification-S",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);

        const updated = await axios.get(
          "http://localhost:8000/api/allNotification-S",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setOrders(updated.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const handleApprove = async () => {
  //   try {
  //     await axios.put(
  //       `http://localhost:8000/api/materialRequests/${selectedOrder.id}/approve`,
  //       {},
  //       {
  //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //       }
  //     );
  //     alert("تمت الموافقة على الطلب");
  //     handleCloseModal();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleReject = async () => {
  //   try {
  //     await axios.put(
  //       `http://localhost:8000/api/materialRequests/${selectedOrder.id}/reject`,
  //       {},
  //       {
  //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //       }
  //     );
  //     alert("تم رفض الطلب");
  //     handleCloseModal();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // --- دوال جديدة خاصة بالتعديل ---
  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...tempProducts];
    // تأكد من أن القيمة رقم وليست نصاً فارغاً
    updatedProducts[index].quantity_approved =
      newQuantity === "" ? 0 : parseInt(newQuantity, 10);
    setTempProducts(updatedProducts);
  };

  // const handleSave = async () => {
  //   try {
  //     const itemsForApi = tempProducts.map((p) => ({
  //       id: p.id,
  //       quantity_approved: p.quantity_approved,
  //     }));
  //     await axios.put(
  //       `http://localhost:8000/api/materialRequests/${selectedOrder.id}/edit`,
  //       {
  //         items: itemsForApi,
  //         notes: "تمت الموافقة مع تعديل الكمية",
  //       },
  //       {
  //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //       }
  //     );
  //     alert("تم حفظ التعديلات");
  //     setIsEditMode(false);
  //     handleCloseModal();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleCancelEdit = () => {
  //   setIsEditMode(false); // إلغاء وضع التعديل
  // };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/allNotification-S",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setOrders(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = async (orderId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/Notification/${orderId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const orderData = res.data.data;
      setSelectedOrder(orderData);

      const formattedItems = orderData.items
        ? orderData.items.map((item) => ({
            id: item.id,
            code: item.product.code,
            name: item.product.name,
            quantity_requested: item.quantity_requested,
            quantity_approved: item.quantity_approved,
            notes: item.notes,
          }))
        : [];
      setTempProducts(formattedItems);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="notification-container"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <div className="notification-page">
          <div className="left-side">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h2 className="section-title" style={{ margin: 0 }}>
                طلبات من المستخدمين
              </h2>
              {/* <button
                className="all-requests-btn"
                onClick={() => navigate("/AllUserRequests")}
              >
                عرض كل طلبات المستخدمين
              </button> */}
              {/* زر قراءة */}
              <button
                className="all-requests-btn"
                style={{ backgroundColor: "#FF8E29", color: "#fff" }}
                onClick={handleMarkAllAsRead}
              >
                قراءة الكل
              </button>
            </div>
            <div
              className="orders-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {orders.map((order, index) => {
                return (
                  <div
                    className="order-card"
                    key={index}
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? theme.palette.background.car
                          : theme.palette.background.card2,
                      padding: "1rem",
                      borderRadius: "12px",
                      width: "100%",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      minHeight: "150px",
                    }}
                  >
                    <div className="order-header">
                      <span className="order-type">📄 طلب مواد</span>
                      <span className="order-id">{order.title}</span>
                    </div>
                    <div className="divider1"></div>
                    <div className="order-info">
                      <p
                        className="order-id1"
                        style={{ color: theme.palette.text.primary }}
                      >
                        نوع :{" "}
                        <span style={{ color: theme.palette.text.secondary }}>
                          {order.type}
                        </span>
                      </p>
                      {/* <p style={{ color: theme.palette.text.primary }}>
                        <strong>من:</strong>{" "}
                        <span style={{ color: theme.palette.text.secondary }}>
                          {order.requested_by?.name}
                        </span>
                      </p>
                      <p
                        className="order-id1"
                        style={{ color: theme.palette.text.primary }}
                      >
                        عدد المواد:{" "}
                        <span style={{ color: theme.palette.text.secondary }}>
                          {order.itemCount}
                        </span>
                      </p>
                      <p
                        className="order-id1"
                        style={{ color: theme.palette.text.primary }}
                      >
                        المستودع:{" "}
                        <span style={{ color: theme.palette.text.secondary }}>
                          {order.warehouse}
                        </span>
                      </p> */}
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
          <div className="divider"></div>
          <div className="right-side">
            <h2 className="section-title"> تنبيهات انخفاض المخزون</h2>
            <p style={{ color: "gray", marginBottom: "1rem" }}>
              بعض المواد منخفضة المخزون، يرجى اتخاذ إجراء:
            </p>
            {[...Array(3)].map((_, index) => (
              <div style={{ marginBottom: "20px" }} key={index}>
                <div
                  className="order-card"
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? theme.palette.background.car
                        : theme.palette.background.car1,
                  }}
                >
                  <div className="order-header">
                    <span className="order-type"> تنبيه: مادة منخفضة</span>
                  </div>
                  <div className="order-info" style={{ marginTop: "10px" }}>
                    <p>
                      <span
                        className="strong"
                        style={{ color: theme.palette.text.primary }}
                      >
                        الصنف:
                      </span>{" "}
                      <span
                        className="order-id1"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        لابتوب HP
                      </span>
                    </p>
                    <p>
                      <span
                        className="strong"
                        style={{ color: theme.palette.text.primary }}
                      >
                        الرمز:
                      </span>{" "}
                      <span
                        className="order-id1"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        ITM-2024-001
                      </span>
                    </p>
                    <p>
                      <span
                        className="strong"
                        style={{ color: theme.palette.text.primary }}
                      >
                        المخزن:
                      </span>{" "}
                      <span
                        className="order-id1"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        التخزين التقني
                      </span>
                    </p>
                    <p>
                      <span
                        className="strong"
                        style={{ color: theme.palette.text.primary }}
                      >
                        الكمية المتبقية:
                      </span>{" "}
                      <span
                        className="order-id1"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        فقط 2
                      </span>
                    </p>
                  </div>
                  <div className="order-actions">
                    <button
                      className="view-btn"
                      style={{ color: theme.palette.text.primary }}
                    >
                      🛒 اطلب الآن
                    </button>
                    <button className="deny-btn"> تجاهل</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="rounded-lg shadow-xl p-6 w-fullmax-w-7xl mx-4"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <div
              className="flex justify-between items-center border-b pb-3 mb-4"
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            >
              <h2
                className="text-xl font-bol"
                style={{ color: theme.palette.text.primary }}
              >
                📝 تفاصيل طلب المواد
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-2xl font-light"
              >
                &times;
              </button>
            </div>
            <div>
              <div
                className="grid grid-cols-2  gap-y-2 text-sm text-gray-700 mb-4 p-3 rounded-md"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
              >
                <p>
                  <strong>مقدم الطلب:</strong>{" "}
                  {selectedOrder.requested_by?.name}
                </p>
                <p>
                  <strong>من مستودع:</strong> {selectedOrder.warehouse}
                </p>
              </div>
              <div className=" rounded-md overflow-hidden">
                <table
                  className="w-full table-fixed"
                  style={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-[25%] px-4 py-2 text-right text-xs font-medium text-white uppercase">
                        كود
                      </th>
                      <th className="w-[50%] px-4 py-2 text-right text-xs font-medium text-white uppercase">
                        المنتج
                      </th>
                      <th className="w-[25%] px-4 py-2 text-center text-xs font-medium text-white uppercase">
                        الكمية
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {tempProducts.map((product, index) => (
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
                          {product.code}
                        </td>
                        <td
                          className="px-4 py-2 text-sm break-words"
                          style={{ color: theme.palette.text.third }}
                        >
                          {product.name}
                        </td>
                        <td
                          className="px-4 py-2 text-sm text-center"
                          style={{ color: theme.palette.text.third }}
                        >
                          {isEditMode ? (
                            <input
                              type="number"
                              value={product.quantity_approved} // أو quantity_requested
                              onChange={(e) =>
                                handleQuantityChange(index, e.target.value)
                              }
                              style={{
                                border: `1px solid ${theme.palette.divider}`,
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                              }}
                              className="w-16 text-center border rounded-md"
                            />
                          ) : (
                            product.quantity_approved
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="mt-6 flex justify-end gap-4">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className=" text-gray-500 font-bold py-2 px-6 rounded-lg hover:text-gray-600 transition"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    className=" text-[#FF8E29] font-bold py-2 px-6 rounded-lg hover:text-yellow-600 transition"
                  >
                    حفظ التعديلات
                  </button>
                </>
              ) : (
                <>
                  {selectedOrder.status !== "approved" &&
                    selectedOrder.status !== "rejected" && (
                      <>
                        <button
                          onClick={handleReject}
                          className=" text-red-600 font-bold py-2 px-6 rounded-lg hover:text-red-700 transition"
                        >
                          رفض
                        </button>
                        <button
                          onClick={handleApprove}
                          className=" text-green-600 font-bold py-2 px-6 rounded-lg hover:text-green-700 transition"
                        >
                          موافقة
                        </button>
                        <button
                          onClick={() => setIsEditMode(true)}
                          className=" text-[#FF8E29] font-bold py-2 px-6 rounded-lg hover:text-yellow-600 transition"
                        >
                          تعديل الكمية
                        </button>
                      </>
                    )}
                </>
              )}
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationBox;
