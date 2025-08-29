import React, { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Manager = () => {
  const [activeTab, setActiveTab] = useState("composition");
  const [installationReports, setInstallationReports] = useState([]);
  const [requestMaterials, setRequestMaterials] = useState([]);
  const [scrapNotes, setScrapNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [tempMaterials, setTempMaterials] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem("token");

  const Name = JSON.parse(localStorage.getItem("user"));
  const Role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const [installRes, requestRes, scrapRes] = await Promise.all([
          axios.get("http://localhost:8000/api/allInstallationReport", {
            headers,
          }),
          axios.get("http://localhost:8000/api/allRequestMaterial", {
            headers,
          }),
          axios.get("http://localhost:8000/api/allScrapNote", { headers }),
        ]);

        setInstallationReports(installRes.data.data.reports || []);
        setRequestMaterials(requestRes.data.data || []);
        setScrapNotes(scrapRes.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = async (card) => {
    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(
        `http://localhost:8000/api/M-Request/show/${card.id}`,
        { headers }
      );

      const data = res.data.data;

      setCurrentCard(data); // خزّن تفاصيل الطلب
      setTempMaterials(
        data.items?.map((item) => ({
          id: item.id,
          name: item.product?.name,
          code: item.product?.code,
          quantity: item.quantity_requested,
          approved: item.quantity_approved,
          notes: item.notes,
        })) || []
      );

      setShowModal(true);
      setEditMode(false);
    } catch (error) {
      console.error("فشل في جلب تفاصيل الطلب:", error);
    }
  };

  const handleCardClick = (card) => {
    if (!card?.type) return;

    if (card.type === "purchase") {
      navigate(`/InstallReportsUserManager/${card.id}`, { state: { card } });
    } else if (card.type === "stock_usage") {
      navigate(`/InstallReportsStoreManager/${card.id}`, { state: { card } });
    } else {
      console.warn("نوع غير معروف:", card.type);
    }
  };

  const handleScrapCardClick = (id) => {
    navigate(`/ScrapNoteManager/${id}`);
  };

  const handleQuantityChange = (index, value) => {
    const newMaterials = [...tempMaterials];
    let val = Number(value);

    if (val < 1) val = 0;
    if (val > newMaterials[index].quantity_requested) {
      val = newMaterials[index].quantity_requested;
    }

    newMaterials[index].quantity = val;
    setTempMaterials(newMaterials);
  };

  const handleSave = async () => {
    if (!currentCard) return;

    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const body = {
        items: tempMaterials.map((mat) => ({
          id: mat.id,
          quantity_approved: mat.quantity,
        })),
        notes: "تمت الموافقة مع تعديل الكمية",
      };

      const res = await axios.put(
        `http://localhost:8000/api/materialRequests/${currentCard.id}/edit`,
        body,
        { headers }
      );

      alert(res.data.message || "تم تعديل الطلب");
      setShowModal(false);

      // تحديث القائمة
      setRequestMaterials((prev) =>
        prev.map((req) =>
          req.id === currentCard.id ? { ...req, status: "approved" } : req
        )
      );
    } catch (error) {
      console.error("فشل في التعديل:", error);
      alert("حدث خطأ أثناء التعديل");
    }
  };

  const handleApprove = async () => {
    if (!currentCard) return;
    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.put(
        `http://localhost:8000/api/materialRequests/${currentCard.id}/approve`,
        {},
        { headers }
      );

      alert(res.data.message || "تمت الموافقة بنجاح");
      setShowModal(false);

      // تحديث القائمة
      setRequestMaterials((prev) =>
        prev.map((req) =>
          req.id === currentCard.id ? { ...req, status: "approved" } : req
        )
      );
    } catch (error) {
      console.error("فشل في الموافقة:", error);
      alert("حدث خطأ أثناء الموافقة");
    }
  };

  const handleReject = async () => {
    if (!currentCard) return;
    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.put(
        `http://localhost:8000/api/materialRequests/${currentCard.id}/reject`,
        {},
        { headers }
      );

      alert(res.data.message || "تم رفض الطلب");
      setShowModal(false);

      // تحديث القائمة
      setRequestMaterials((prev) =>
        prev.map((req) =>
          req.id === currentCard.id ? { ...req, status: "rejected" } : req
        )
      );
    } catch (error) {
      console.error("فشل في الرفض:", error);
      alert("حدث خطأ أثناء الرفض");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { headers }
      );

      if (response.data.success) {
        alert(response.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
      alert("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FFF4EA] justify-between items-start px-8">
      <div className="flex-1 min-w-[600px] min-h-[800px] flex flex-col items-center justify-start pt-10 bg-white rounded-2xl shadow-md p-6 mt-8 mb-8 mr-4">
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
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-xl text-lg transition ${
              activeTab === "all"
                ? "text-[#FF8E29] font-bold"
                : "text-gray-800 hover:text-[#FF8E29]"
            }`}
          >
            عرض الكل
          </button>
        </div>

        <div className="w-full max-w-6xl">
          {activeTab === "approval" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center mr-auto">
              {requestMaterials
                .slice() // نسخة مشان ما يغير الأصل
                .sort((a, b) => {
                  if (a.status === "pending" && b.status !== "pending")
                    return -1;
                  if (a.status !== "pending" && b.status === "pending")
                    return 1;
                  return 0;
                })
                .map((card, index) => (
                  <div
                    key={card.id}
                    className={`p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between ${
                      index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FFF4EA]"
                    }`}
                    onClick={() => openModal(card)}
                  >
                    <div
                      className="space-y-3"
                      style={{
                        width: "320px",
                        backgroundColor:
                          index % 2 === 0 ? "#F5F5F5" : "#FFF4EA",
                      }}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">
                          الرقم
                        </span>
                        <span className="font-bold text-[#FF8E29]">
                          {card.serial_number}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">
                          التاريخ
                        </span>
                        <span className="text-gray-800">
                          {card.date?.slice(0, 10)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">
                          العدد
                        </span>
                        <span className="text-gray-800">
                          {card.materials?.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-600">من</span>
                        <span className="text-gray-800">
                          {card.requested_by?.name || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                        <span className="font-semibold text-gray-600">
                          الحالة
                        </span>
                        <span className="font-semibold text-[#6F757E]">
                          {card.status}
                        </span>
                      </div>
                      {card.type && (
                        <div className="flex justify-between text-sm items-center">
                          <span className="font-semibold text-gray-600">
                            النوع
                          </span>
                          <span className="font-semibold text-[#6F757E]">
                            {card.type}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "composition" && (
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {installationReports
                  .slice() // نسخة مشان ما يغير الأصل
                  .sort((a, b) => {
                    if (a.status === "pending" && b.status !== "pending")
                      return -1;
                    if (a.status !== "pending" && b.status === "pending")
                      return 1;
                    return 0;
                  })
                  .map((item, index) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between ${
                        index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FFF4EA]"
                      }`}
                      onClick={() => handleCardClick(item)}
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
                            {item.materials?.length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-600">
                            أمين المستودع
                          </span>
                          <span className="text-gray-800">
                            {item.created_by?.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                          <span className="font-semibold text-gray-600">
                            الحالة
                          </span>
                          <span className="font-semibold text-[#6F757E]">
                            {item.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                          <span className="font-semibold text-gray-600">
                            النوع
                          </span>
                          <span className="font-semibold text-[#6F757E]">
                            {item.type}
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
              {scrapNotes.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <p>لا توجد مذكرات إتلاف بعد</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {scrapNotes
                    .slice() // نسخة مشان ما يغير الأصل
                    .sort((a, b) => {
                      if (a.status === "pending" && b.status !== "pending")
                        return -1;
                      if (a.status !== "pending" && b.status === "pending")
                        return 1;
                      return 0;
                    })
                    .map((item, index) => (
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
                              {item.materials?.length}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-600">
                              أمين المستودع
                            </span>
                            <span className="text-gray-800">
                              {item.created_by?.name || "—"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span className="font-semibold text-gray-600">
                              الحالة
                            </span>
                            <span className="font-semibold text-[#6F757E]">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
          {activeTab === "all" && (
            <div className="w-full space-y-8">
              {/* طلبات المواد */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#FF8E29]">
                  طلبات المواد
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
                  {requestMaterials
                    .slice() // نسخة مشان ما يغير الأصل
                    .sort((a, b) => {
                      if (a.status === "pending" && b.status !== "pending")
                        return -1;
                      if (a.status !== "pending" && b.status === "pending")
                        return 1;
                      return 0;
                    })
                    .map((card, index) => (
                      <div
                        key={card.id}
                        className={`p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between ${
                          index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FFF4EA]"
                        }`}
                        onClick={() => openModal(card)}
                      >
                        <div
                          className="space-y-3"
                          style={{
                            width: "320px",
                            backgroundColor:
                              index % 2 === 0 ? "#F5F5F5" : "#FFF4EA",
                          }}
                        >
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-600">
                              الرقم
                            </span>
                            <span className="font-bold text-[#FF8E29]">
                              {card.serial_number}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-600">
                              التاريخ
                            </span>
                            <span className="text-gray-800">
                              {card.date?.slice(0, 10)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-600">
                              العدد
                            </span>
                            <span className="text-gray-800">
                              {card.materials?.length}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-600">
                              من
                            </span>
                            <span className="text-gray-800">
                              {card.requested_by?.name || "—"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span className="font-semibold text-gray-600">
                              الحالة
                            </span>
                            <span className="font-semibold text-[#6F757E]">
                              {card.status}
                            </span>
                          </div>
                          {card.type && (
                            <div className="flex justify-between text-sm items-center">
                              <span className="font-semibold text-gray-600">
                                النوع
                              </span>
                              <span className="font-semibold text-[#6F757E]">
                                {card.type}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* ضبط التركيب */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#FF8E29]">
                  ضبط التركيب
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {installationReports
                    .slice() // نسخة مشان ما يغير الأصل
                    .sort((a, b) => {
                      if (a.status === "pending" && b.status !== "pending")
                        return -1;
                      if (a.status !== "pending" && b.status === "pending")
                        return 1;
                      return 0;
                    })
                    .map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between ${
                          index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FFF4EA]"
                        }`}
                        onClick={() => handleCardClick(item)}
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
                              {item.materials?.length}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-600">
                              أمين المستودع
                            </span>
                            <span className="text-gray-800">
                              {item.created_by?.name}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span className="font-semibold text-gray-600">
                              الحالة
                            </span>
                            <span className="font-semibold text-[#6F757E]">
                              {item.status}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span className="font-semibold text-gray-600">
                              النوع
                            </span>
                            <span className="font-semibold text-[#6F757E]">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* مذكرات الإتلاف */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#FF8E29]">
                  مذكرات الإتلاف
                </h2>
                {scrapNotes.length === 0 ? (
                  <div className="text-center text-gray-500 py-10">
                    <p>لا توجد مذكرات إتلاف بعد</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {scrapNotes
                      .slice() // نسخة مشان ما يغير الأصل
                      .sort((a, b) => {
                        if (a.status === "pending" && b.status !== "pending")
                          return -1;
                        if (a.status !== "pending" && b.status === "pending")
                          return 1;
                        return 0;
                      })
                      .map((item, index) => (
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
                                أمين المستودع
                              </span>
                              <span className="text-gray-800">
                                {item.created_by?.name || "—"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                              <span className="font-semibold text-gray-600">
                                الحالة
                              </span>
                              <span className="font-semibold text-[#6F757E]">
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-[216px] h-[1050px] bg-white shadow-sm p-6 flex flex-col items-center border border-gray-200 rounded-[20px] mt-8 mb-8">
        <UserCircleIcon className="w-16 h-16 text-[#FF8E29] mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{Name?.name}</h2>
        <p className="text-gray-600 mb-4">{Role}</p>
        <button className="bg-[#FF8E29] text-white px-4 py-2 rounded-lg mb-2 hover:bg-[#FF8E29]/90 transition w-full text-center cursor-pointer">
          تعديل البروفايل
        </button>
        <button
          className="bg-[#EB001B] text-white px-4 py-2 rounded-lg mb-2 hover:bg-[#d1001b]/90 transition w-full text-center cursor-pointer"
          onClick={handleLogout}
        >
          تسجيل الخروج
        </button>
      </div>

      {showModal && currentCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(110, 104, 104, 0.4)" }}
          ></div>
          <div className="relative bg-white rounded-xl p-6 w-2/5 max-h-[80vh] overflow-y-auto shadow-lg z-50">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#FF8E29]">
              تفاصيل الطلب
            </h2>
            <div className="mb-6 space-y-2 text-right">
              <p>
                <strong>الاسم:</strong> {currentCard.requested_by?.name}
              </p>
              <p>
                <strong>قسم:</strong> {currentCard.requested_by?.department_id}
              </p>
              <p>
                <strong>الملاحظات:</strong> {currentCard.status}
              </p>
            </div>
            <div className="space-y-3 mb-6 bg-white rounded p-3">
              <div className="flex justify-between font-bold border-b border-gray-300 pb-2 mb-2">
                <span>المادة</span>
                <span>الكمية</span>
                <span>الكود</span>
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
                      max={mat.quantity}
                      value={mat.quantity}
                      onChange={(e) =>
                        handleQuantityChange(idx, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
                    />
                  ) : (
                    <span>{mat.quantity}</span>
                  )}
                  <span>{mat.code}</span>
                </div>
              ))}
            </div>

            {currentCard.status !== "approved" &&
              currentCard.status !== "rejected" && (
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
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
