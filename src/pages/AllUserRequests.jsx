import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/NotificationBox.css"; // أبقيت على هذا السطر كما هو في الكود الأصلي
import MainLayout from "../MainLayout.jsx";

const sampleOrders = [
  {
    id: '#طلب-2025-001',
    user: 'علي محمود',
    itemCount: 3,
    warehouse: 'دمشق',
    products: [
      { code: 'P001', name: 'طابعة HP Laserjet', quantity: 1 },
      { code: 'P002', name: 'شاشة Samsung 24"', quantity: 2 },
      { code: 'M005', name: 'لوحة مفاتيح لاسلكية', quantity: 1 }
    ]
  },
  {
    id: '#طلب-2025-002',
    user: 'فاطمة الزهراء',
    itemCount: 8,
    warehouse: 'حلب',
    products: [
      { code: 'L011', name: 'لابتوب Dell Vostro ذو معالج حديث ومواصفات عالية', quantity: 1 },
      { code: 'A015', name: 'حقيبة لابتوب مقاومة للماء والغبار', quantity: 1 },
      { code: 'L012', name: 'لابتوب Lenovo ThinkPad', quantity: 5 },
      { code: 'A018', name: 'ماوس إضافي', quantity: 10 },
      { code: 'C021', name: 'كيبورد ميكانيكي', quantity: 3 },
      { code: 'S033', name: 'سماعات رأس', quantity: 7 },
    ]
  },
];

for (let i = 3; i <= 12; i++) {
  sampleOrders.push({
    ...sampleOrders[i % 2],
    id: `#طلب-2025-00${i}`
  });
}

const AllUserRequests = ({ mode, toggleTheme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCreateExitNote = () => {
    navigate('/CreateExitNote');
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="طلبات من المستخدمين">
      {/* لم أغير أي شيء هنا إطلاقاً */}
      <div className="notification-container">
        <div className="left-side" style={{ margin: '0 auto', maxWidth: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>طلبات من المستخدمين</h2>
          </div>
          <div className="orders-grid">
            {sampleOrders.map((order, i) => {
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
                    <span className="order-type">📄 طلب مواد</span>
                    <span className="order-id">{order.id}</span>
                  </div>
                  <div className="divider1"></div>
                  <div className="order-info">
                    <p><strong>من:</strong> {order.user}</p>
                    <p className="order-id1">عدد المواد: {order.itemCount}</p>
                    <p className="order-id1">المستودع: {order.warehouse} </p>
                  </div>
                  <div className="order-actions">
                    <button className="view-btn" onClick={() => handleViewDetails(order)}>
                      ▼ عرض التفاصيل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* التعديل الوحيد تم هنا فقط */}
      {isModalOpen && selectedOrder && (
        <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleCloseModal}
        >
            <div
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-7xl mx-4"
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-bold text-green-600">✅ تم الموافقة على طلبك</h2>
                    <button onClick={handleCloseModal} className="text-2xl font-light">&times;</button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">تفاصيل المواد المطلوبة:</h3>
                    <div className="flex justify-center">
                        <div className=" "> 
                            <table className="w-full table-fixed border-collapse">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="w-[10px] px-4 py-2 text-right text-xs font-medium text-white uppercase">كود</th>
                                        <th className=" w-[10px] px-4 py-2 text-right text-xs font-medium text-white uppercase">المنتج</th>
                                        <th className="w-[10px] px-4 py-2 text-center text-xs font-medium text-white uppercase">الكمية</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {selectedOrder.products.slice(0, 4).map((product, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-sm break-words">{product.code}</td>
                                            <td className="px-4 py-2 text-sm break-words">{product.name}</td>
                                            <td className="px-4 py-2 text-sm text-center">{product.quantity}</td>
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
                        className=" text-[#FF8E29] font-bold py-2 px-6 rounded-lg hover:text-[#e07a1b] transition"
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