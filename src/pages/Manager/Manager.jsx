import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const sampleDataInitial = [
  {
    id: 1,
    user: "أحمد علي",
    warehouse: "المستودع الرئيسي",
    date: "2025-08-10",
    notes: "طلب عاجل",
    materials: [
      { name: "مادة 1", quantity: 10, total: 150 },
      { name: "مادة 2", quantity: 5, total: 75 },
      { name: "مادة 3", quantity: 7, total: 120 },
      { name: "مادة 4", quantity: 3, total: 60 },
    ],
  },
  {
    id: 1,
    user: "أحمد علي",
    warehouse: "المستودع الرئيسي",
    date: "2025-08-10",
    notes: "طلب عاجل",
    materials: [
      { name: "مادة 1", quantity: 10, total: 150 },
      { name: "مادة 2", quantity: 5, total: 75 },
      { name: "مادة 3", quantity: 7, total: 120 },
      { name: "مادة 4", quantity: 3, total: 60 },
    ],
  },
  {
    id: 1,
    user: "أحمد علي",
    warehouse: "المستودع الرئيسي",
    date: "2025-08-10",
    notes: "طلب عاجل",
    materials: [
      { name: "مادة 1", quantity: 10, total: 150 },
      { name: "مادة 2", quantity: 5, total: 75 },
      { name: "مادة 3", quantity: 7, total: 120 },
      { name: "مادة 4", quantity: 3, total: 60 },
    ],
  },
  {
    id: 1,
    user: "أحمد علي",
    warehouse: "المستودع الرئيسي",
    date: "2025-08-10",
    notes: "طلب عاجل",
    materials: [
      { name: "مادة 1", quantity: 10, total: 150 },
      { name: "مادة 2", quantity: 5, total: 75 },
      { name: "مادة 3", quantity: 7, total: 120 },
      { name: "مادة 4", quantity: 3, total: 60 },
    ],
  },
  {
    id: 2,
    user: "سارة محمد",
    warehouse: "مخزن A",
    date: "2025-08-11",
    notes: "مخصص لقسم الإنتاج",
    materials: [
      { name: "مادة A", quantity: 8, total: 200 },
      { name: "مادة B", quantity: 3, total: 90 },
      { name: "مادة C", quantity: 6, total: 110 },
      { name: "مادة D", quantity: 2, total: 40 },
    ],
  },

  {
    id: 3,
    user: "خالد يوسف",
    warehouse: "مخزن B",
    date: "2025-08-12",
    notes: "للاستخدام اليومي",
    materials: [
      { name: "مادة X", quantity: 12, total: 300 },
      { name: "مادة Y", quantity: 7, total: 140 },
      { name: "مادة Z", quantity: 5, total: 100 },
      { name: "مادة W", quantity: 4, total: 90 },
    ],
  },
];

const Manager = () => {
  const [activeTab, setActiveTab] = useState("composition");
  const [sampleData, setSampleData] = useState(sampleDataInitial);
  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [tempMaterials, setTempMaterials] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const openModal = (card) => {
    setCurrentCard(card);
    setTempMaterials(card.materials.map((m) => ({ ...m })));
    setShowModal(true);
    setEditMode(false);
  };

  const handleQuantityChange = (index, value) => {
    const newMaterials = [...tempMaterials];
    newMaterials[index].quantity = Number(value);
    setTempMaterials(newMaterials);
  };

  const handleSave = () => {
    const newData = sampleData.map((card) =>
      card.id === currentCard.id ? { ...card, materials: tempMaterials } : card
    );
    setSampleData(newData);
    setShowModal(false);
  };

  const handleDelete = () => {
    const newData = sampleData.filter((card) => card.id !== currentCard.id);
    setSampleData(newData);
    setShowModal(false);
  };

  // أزرار الموافقة والرفض داخل المودال
  const handleApprove = () => {
    alert(`تمت الموافقة على الطلب رقم ${currentCard.id}`);
    setShowModal(false);
  };

  const handleReject = () => {
    alert(`تم الرفض على الطلب رقم ${currentCard.id}`);
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#FFF4EA] justify-between items-start px-8">
      {/* الجزء الرئيسي */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 bg-white rounded-2xl shadow-md p-6 mt-8 mb-8 mr-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Manager Dashboard
        </h1>

        {/* تبويبات */}
        <div className="flex space-x-4 mb-10">
          <button
            onClick={() => setActiveTab("composition")}
            className={`px-6 py-3 rounded-xl text-lg transition ${
              activeTab === "composition"
                ? "text-[#FF8E29] font-bold"
                : "text-gray-800 hover:text-[#FF8E29]"
            }`}
          >
            ضبط التركيب
          </button>
          <button
            onClick={() => setActiveTab("approval")}
            className={`px-6 py-3 rounded-xl text-lg transition ${
              activeTab === "approval"
                ? "text-[#FF8E29] font-bold"
                : "text-gray-800 hover:text-[#FF8E29]"
            }`}
          >
            موافقة على الأغراض
          </button>
        </div>

        {/* الكروت */}
        <div className="w-full max-w-6xl">
          {(activeTab === "composition" || activeTab === "approval") && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
              {sampleData.map((card, index) => (
                <div
                  key={card.id}
                  className={`p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg flex flex-col justify-between`}
                  style={{
                    width: "320px",
                    minHeight: "380px",
                    backgroundColor: index % 2 === 0 ? "white" : "#FFF4EA",
                  }}
                >
                  <div className="flex justify-between mb-3 font-bold text-black text-lg">
                    <span>المادة</span>
                    <span>الكمية</span>
                    <span>السعر</span>
                  </div>

                  <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                    {card.materials.map((mat, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-[#6F757E] text-sm"
                      >
                        <span>{mat.name}</span>
                        <span>{mat.quantity}</span>
                        <span>{mat.total} د.ع</span>
                      </div>
                    ))}
                  </div>

                  {/* أزرار */}
                  {activeTab === "composition" ? (
                    <div className="flex justify-center mt-2 gap-2">
                      <button
                        onClick={() =>
                          alert(`تمت الموافقة على الطلب رقم ${card.id}`)
                        }
                        className="bg-[#28A745] text-white rounded-xl px-6 py-2 font-bold hover:bg-[#218838]"
                      >
                        موافقة
                      </button>
                      <button
                        onClick={() =>
                          alert(`تم الرفض على الطلب رقم ${card.id}`)
                        }
                        className="bg-[#EB001B] text-white rounded-xl px-6 py-2 font-bold hover:bg-[#b30015]"
                      >
                        رفض
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center mt-2">
                      <button
                        className="bg-[#FF8E29] text-white rounded-xl px-6 py-2 font-bold hover:bg-[#e07a1b]  "
                        onClick={() => openModal(card)}
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-[216px] h-[1050px] bg-white shadow-sm p-6 flex flex-col items-center border border-gray-200 rounded-[20px] mt-8 mb-8">
        <UserCircleIcon className="w-16 h-16 text-[#FF8E29] mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Malak Mobark</h2>
        <p className="text-gray-600 mb-4">Warehouse Manager</p>

        <button className="bg-[#FF8E29] text-white px-4 py-2 rounded-lg mb-2 hover:bg-[#FF8E29]/90 transition w-full text-center">
          تعديل البروفايل
        </button>
        <button className="bg-[#EB001B] text-white px-4 py-2 rounded-lg mb-2 hover:bg-[#d1001b]/90 transition w-full text-center">
          تسجيل الخروج
        </button>
      </div>

      {/* مودال */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* الخلفية الرمادية */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(110, 104, 104, 0.4)" }}
          ></div>
          {/* المودال */}
          <div className="relative bg-white rounded-xl p-6 w-2/5 max-h-[80vh] overflow-y-auto shadow-lg z-50">
            <h2 className="text-xl font-bold mb-4 text-[#FF8E29]">
              تفاصيل الطلب
            </h2>

            {/* محتوى الطلب على اليمين */}
            <div className="mb-6 space-y-2 text-right">
              <p>
                <strong>الاسم:</strong> أحمد علي
              </p>
              <p>
                <strong>قسم:</strong> المستودع الرئيسي
              </p>
              <p>
                <strong>الملاحظات:</strong> طلب عاجل
              </p>
            </div>

            {/* جدول المواد */}
            <div className="space-y-3 mb-6 bg-white rounded p-3">
              {/* رؤوس الجدول */}
              <div className="flex justify-between font-bold border-b border-gray-300 pb-2 mb-2">
                <span>المادة</span>
                <span>الكمية</span>
                <span>السعر</span>
              </div>

              {/* صفوف المواد مع تظليل الصفوف البديلة */}
              {tempMaterials.map((mat, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center mb-1 px-2 py-1 rounded ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <span>{mat.name}</span>
                  {editMode ? (
                    <input
                      type="number"
                      min={0}
                      value={mat.quantity}
                      onChange={(e) =>
                        handleQuantityChange(idx, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
                    />
                  ) : (
                    <span>{mat.quantity}</span>
                  )}
                  <span>{mat.total} د.ع</span>
                </div>
              ))}
            </div>

            {/* أزرار المودال */}
            <div className="flex gap-4 justify-center mt-6 flex-wrap">
              <button
                onClick={handleReject}
                className="bg-[#EB001B] text-white rounded-xl px-6 py-2 font-bold hover:bg-[#b30015]"
              >
                رفض
              </button>
              <button
                onClick={handleApprove}
                className="bg-[#28A745] text-white rounded-xl px-6 py-2 font-bold hover:bg-[#218838]"
              >
                موافقة
              </button>

              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-[#FF8E29] text-white rounded-xl px-6 py-2 font-bold hover:bg-[#e07a1b]"
              >
                {editMode ? "إلغاء التعديل" : "تعديل الكمية"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
