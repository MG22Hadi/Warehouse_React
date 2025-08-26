import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationBox.css";

// ملاحظة: بما أن الكود لا يحتوي على MainLayout، قمت بإزالته.
// إذا كان ضرورياً، يمكنك إضافته مرة أخرى بنفسك.

const sampleOrdersData = [
  {
    id: "#طلب-2025-001",
    user: "علي محمود",
    itemCount: 3,
    warehouse: "دمشق",
    products: [
      { code: "P001", name: "طابعة HP Laserjet", quantity: 1 },
      { code: "P002", name: 'شاشة Samsung 24"', quantity: 2 },
      { code: "M005", name: "لوحة مفاتيح لاسلكية", quantity: 1 },
    ],
  },
  {
    id: "#طلب-2025-002",
    user: "فاطمة الزهراء",
    itemCount: 2,
    warehouse: "حلب",
    products: [
      { code: "L011", name: "لابتوب Dell Vostro", quantity: 1 },
      { code: "A015", name: "حقيبة لابتوب", quantity: 1 },
    ],
  },
  ...Array(4)
    .fill(null)
    .map((_, i) => ({
      ...[
        {
          id: `#طلب-2025-00${3 + i * 2}`,
          user: "أحمد خالد",
          itemCount: 5,
          warehouse: "حمص",
          products: [{ code: "S033", name: "سماعات رأس", quantity: 10 }],
        },
        {
          id: `#طلب-2025-00${4 + i * 2}`,
          user: "سارة مراد",
          itemCount: 1,
          warehouse: "اللاذقية",
          products: [{ code: "C021", name: "كيبورد ميكانيكي", quantity: 2 }],
        },
      ][i % 2],
    })),
];

const NotificationBox = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // --- حالات جديدة لوضع التعديل والبيانات المؤقتة ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempProducts, setTempProducts] = useState([]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    // عمل نسخة من المنتجات للتعديل عليها دون التأثير على الأصل
    setTempProducts(JSON.parse(JSON.stringify(order.products)));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setIsEditMode(false); // إعادة تعيين وضع التعديل عند الإغلاق
  };

  const handleApprove = () => {
    alert(`تمت الموافقة على الطلب رقم ${selectedOrder.id}`);
    handleCloseModal();
  };
  const handleReject = () => {
    alert(`تم رفض الطلب رقم ${selectedOrder.id}`);
    handleCloseModal();
  };

  // --- دوال جديدة خاصة بالتعديل ---
  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...tempProducts];
    // تأكد من أن القيمة رقم وليست نصاً فارغاً
    updatedProducts[index].quantity =
      newQuantity === "" ? 0 : parseInt(newQuantity, 10);
    setTempProducts(updatedProducts);
  };

  const handleSave = () => {
    console.log("البيانات الجديدة:", tempProducts);
    alert("تم حفظ التعديلات");
    // هنا يمكنك إرسال البيانات المحدثة للباك إند
    setIsEditMode(false); // الخروج من وضع التعديل
  };

  const handleCancelEdit = () => {
    setIsEditMode(false); // إلغاء وضع التعديل
  };

  return (
    <>
      <div className="notification-container">
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
              <button
                className="all-requests-btn"
                onClick={() => navigate("/AllUserRequests")}
              >
                عرض كل طلبات المستخدمين
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
              {sampleOrdersData.map((order, i) => {
                const row = Math.floor(i / 2);
                const col = i % 2;
                const isOrange =
                  (row % 2 === 0 && col === 0) || (row % 2 === 1 && col === 1);
                return (
                  <div
                    className="order-card"
                    key={i}
                    style={{
                      backgroundColor: isOrange ? "#FFF4EA" : "#F5F5F5",
                      padding: "1rem",
                      borderRadius: "12px",
                      width: "100%",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      minHeight: "150px",
                    }}
                  >
                    <div className="order-header">
                      <span className="order-type">📄 طلب مواد</span>
                      <span className="order-id">{order.id}</span>
                    </div>
                    <div className="divider1"></div>
                    <div className="order-info">
                      <p>
                        <strong>من:</strong> {order.user}
                      </p>
                      <p className="order-id1">عدد المواد: {order.itemCount}</p>
                      <p className="order-id1">المستودع: {order.warehouse}</p>
                    </div>
                    <div className="order-actions">
                      <button
                        className="view-btn"
                        onClick={() => handleViewDetails(order)}
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
            {[...Array(3)].map((_, i) => (
              <div style={{ marginBottom: "20px" }} key={i}>
                <div
                  className="order-card"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#F5F5F5" : "#FFF4EA",
                  }}
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

      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-fullmax-w-7xl mx-4"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
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
              <div className="grid grid-cols-2  gap-y-2 text-sm text-gray-700 mb-4 p-3 bg-gray-50 rounded-md">
                <p>
                  <strong>مقدم الطلب:</strong> {selectedOrder.user}
                </p>
                <p>
                  <strong>من مستودع:</strong> {selectedOrder.warehouse}
                </p>
              </div>
              <div className=" rounded-md overflow-hidden">
                <table className="w-full table-fixed">
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
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* استخدام البيانات المؤقتة وعرض حقل الإدخال في وضع التعديل */}
                    {tempProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm break-words">
                          {product.code}
                        </td>
                        <td className="px-4 py-2 text-sm break-words">
                          {product.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          {isEditMode ? (
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(index, e.target.value)
                              }
                              className="w-16 text-center border border-gray-300 rounded-md"
                            />
                          ) : (
                            product.quantity
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationBox;
