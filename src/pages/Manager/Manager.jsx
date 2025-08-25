import React, { useState } from "react"; // تم إزالة useEffect
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
// تم إزالة axios

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
  {
    id: 4,
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
    id: 5,
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
];

const compositionNotesData = [];
for (let i = 1; i <= 12; i++) {
  const isEven = i % 2 === 0;
  compositionNotesData.push({
    id: i,
    serial: `OUT-2024-00${i}`,
    date: "2024-05-20",
    count: 5,
    recipient: "نور",
    action: isEven ? "شراء" : "استخدام من المستودع",
    link: isEven ? "/InstallReportsUserManager" : "/InstallReportsStoreManager",
  });
}

// --- بيانات ثابتة جديدة لمذكرات الإتلاف ---
const scrapNotesDataInitial = [
  {
    id: 1,
    serial_number: "SCR-2025-001",
    date: "2025-08-20",
    items_count: 3,
    user: { name: "مشرف الصيانة" },
  },
  {
    id: 2,
    serial_number: "SCR-2025-002",
    date: "2025-08-21",
    items_count: 5,
    user: { name: "مدير الجودة" },
  },
  {
    id: 3,
    serial_number: "SCR-2025-003",
    date: "2025-08-22",
    items_count: 2,
    user: { name: "مشرف الصيانة" },
  },
  {
    id: 4,
    serial_number: "SCR-2025-004",
    date: "2025-08-23",
    items_count: 8,
    user: { name: "مدير المخزن" },
  },
  {
    id: 1,
    serial_number: "SCR-2025-001",
    date: "2025-08-20",
    items_count: 3,
    user: { name: "مشرف الصيانة" },
  },
  {
    id: 2,
    serial_number: "SCR-2025-002",
    date: "2025-08-21",
    items_count: 5,
    user: { name: "مدير الجودة" },
  },
  {
    id: 3,
    serial_number: "SCR-2025-003",
    date: "2025-08-22",
    items_count: 2,
    user: { name: "مشرف الصيانة" },
  },
  {
    id: 4,
    serial_number: "SCR-2025-004",
    date: "2025-08-23",
    items_count: 8,
    user: { name: "مدير المخزن" },
  },
  {
    id: 1,
    serial_number: "SCR-2025-001",
    date: "2025-08-20",
    items_count: 3,
    user: { name: "مشرف الصيانة" },
  },
  {
    id: 2,
    serial_number: "SCR-2025-002",
    date: "2025-08-21",
    items_count: 5,
    user: { name: "مدير الجودة" },
  },
  {
    id: 3,
    serial_number: "SCR-2025-003",
    date: "2025-08-22",
    items_count: 2,
    user: { name: "مشرف الصيانة" },
  },
  {
    id: 4,
    serial_number: "SCR-2025-004",
    date: "2025-08-23",
    items_count: 8,
    user: { name: "مدير المخزن" },
  },
];

const Manager = () => {
  const [activeTab, setActiveTab] = useState("composition");
  const [sampleData, setSampleData] = useState(sampleDataInitial);
  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [tempMaterials, setTempMaterials] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // --- استخدام البيانات الثابتة مباشرة ---
  const [scrapNotes, setScrapNotes] = useState(scrapNotesDataInitial);

  // تم إزالة useEffect الخاص بجلب البيانات من الـ API

  const openModal = (card) => {
    setCurrentCard(card);
    setTempMaterials(card.materials.map((m) => ({ ...m })));
    setShowModal(true);
    setEditMode(false);
  };
  const handleCardClick = (link) => {
    navigate(link);
  };

  const handleScrapCardClick = (id) => {
    navigate("/ScrapNoteManager");
  };
  const handleCreateScrapNote = () => {
    navigate("/CreateScrapNote");
  };

  const handleCompositionApprove = (e, cardId) => {
    e.stopPropagation();
    alert(`تمت الموافقة على الكرت رقم ${cardId}`);
  };
  const handleCompositionReject = (e, cardId) => {
    e.stopPropagation();
    alert(`تم رفض الكرت رقم ${cardId}`);
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
      <div className="flex-1 flex flex-col items-center justify-start pt-10 bg-white rounded-2xl shadow-md p-6 mt-8 mb-8 mr-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Manager Dashboard
        </h1>

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
            طلبات المواد
          </button>
          <button
            onClick={() => setActiveTab("destruction")}
            className={`px-6 py-3 rounded-xl text-lg transition ${
              activeTab === "destruction"
                ? "text-[#FF8E29] font-bold"
                : "text-gray-800 hover:text-[#FF8E29]"
            }`}
          >
            مذكرات الاتلاف
          </button>
        </div>

        <div className="w-full max-w-6xl">
          {activeTab === "approval" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
              {sampleData.map((card, index) => (
                <div
                  key={card.id}
                  className={`p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg flex flex-col justify-between`}
                  // *** التعديل: تغيير لون خلفية الكروت لتكون متناوبة ***
                  style={{
                    width: "320px",
                    minHeight: "380px",
                    backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#FFF4EA",
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
                  <div className="flex justify-center mt-2">
                    <button
                      className=" text-[#FF8E29] rounded-xl px-6 py-2 font-bold hover:text-[#e07a1b]"
                      onClick={() => openModal(card)}
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "composition" && (
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {compositionNotesData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between ${
                      index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FFF4EA]"
                    }`}
                    onClick={() => handleCardClick(item.link)}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">
                          الرقم
                        </span>
                        <span className="font-bold text-[#FF8E29]">
                          {item.serial}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">
                          التاريخ
                        </span>
                        <span className="text-gray-800">{item.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">
                          العدد
                        </span>
                        <span className="text-gray-800">{item.count}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">
                          المستلم
                        </span>
                        <span className="text-gray-800">{item.recipient}</span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                        <span className="font-semibold text-gray-600">
                          الحالة
                        </span>
                        <span className="font-semibold text-[#6F757E]">
                          {item.action}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "destruction" && (
            <div className="w-full">
              <div className="flex justify-start mb-6"></div>
              {scrapNotes.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <p>لا توجد مذكرات إتلاف بعد</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {scrapNotes.map((item, index) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl ${
                        index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FFF4EA]"
                      }`}
                      onClick={() => handleScrapCardClick(item.id)}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-600">
                            الرقم
                          </span>
                          <span className="font-bold text-[#FF8E29]">
                            {item.serial_number}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-600">
                            التاريخ
                          </span>
                          <span className="text-gray-800">
                            {item.date?.slice(0, 10)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-600">
                            العدد
                          </span>
                          <span className="text-gray-800">
                            {item.items_count}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-600">
                            المستلم
                          </span>
                          <span className="text-gray-800">
                            {item.user?.name || "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(110, 104, 104, 0.4)" }}
          ></div>
          <div className="relative bg-white rounded-xl p-6 w-2/5 max-h-[80vh] overflow-y-auto shadow-lg z-50">
            <h2 className="text-xl font-bold mb-4 text-[#FF8E29]">
              تفاصيل الطلب
            </h2>
            <div className="mb-6 space-y-2 text-right">
              <p>
                <strong>الاسم:</strong> {currentCard.user}
              </p>
              <p>
                <strong>قسم:</strong> {currentCard.warehouse}
              </p>
              <p>
                <strong>الملاحظات:</strong> {currentCard.notes}
              </p>
            </div>
            <div className="space-y-3 mb-6 bg-white rounded p-3">
              <div className="flex justify-between font-bold border-b border-gray-300 pb-2 mb-2">
                <span>المادة</span>
                <span>الكمية</span>
                <span>السعر</span>
              </div>
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
              {editMode && (
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white rounded-xl px-6 py-2 font-bold hover:bg-blue-600"
                >
                  حفظ التعديلات
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
