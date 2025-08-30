import React, { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Manager = ({ mode = "light", toggleTheme }) => {
  const theme = useTheme();
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

  // local fallback mode (when no toggleTheme provided)
  const [localMode, setLocalMode] = useState(mode);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <p style={{ color: theme.palette.text.primary }}>
          جاري تحميل البيانات...
        </p>
      </div>
    );
  }

  const accent = theme?.palette?.warning?.main || "#FF8E29";
  const cardAlt = theme?.palette?.action?.hover || "#F5F5F5";
  const cardBase = theme?.palette?.background?.paper || "#FFF4EA";
  const textPrimary = theme?.palette?.text?.primary || "#111827";
  const textSecondary = theme?.palette?.text?.secondary || "#6B7280";
  const divider = theme?.palette?.divider || "#E5E7EB";

  return (
    <div
      dir="ltr"
      className="relative flex min-h-screen justify-between items-start px-8"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div
        className="flex-1 min-w-[600px] min-h-[800px] flex flex-col items-center justify-start pt-10 rounded-2xl shadow-md p-6 mt-8 mb-8 mr-4"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        {/* header with toggle button */}
        <div className="relative w-full flex items-center justify-between mb-8">
          <h1
            className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold"
            style={{ color: textPrimary }}
          >
            Manager Dashboard
          </h1>

          <div className="flex items-center gap-3">
            {/* Theme toggle button */}
            <button
              onClick={() => {
                if (typeof toggleTheme === "function") {
                  toggleTheme();
                } else {
                  // fallback: flip localMode
                  setLocalMode((m) => (m === "dark" ? "light" : "dark"));
                  document.documentElement.classList.toggle("dark");
                }
              }}
              className="px-4 py-2 rounded-lg transition"
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `1px solid ${divider}`,
              }}
            >
              {mode === "dark" || localMode === "dark" ? (
                <>
                  <LightModeIcon />
                </>
              ) : (
                <>
                  <DarkModeIcon />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-10" style={{ gap: 16 }}>
        <button
            onClick={() => setActiveTab("custody")}
            className={`px-6 py-3 rounded-xl text-lg transition`}
            style={
              activeTab === "custody"
                ? { color: accent, fontWeight: "700" }
                : { color: textPrimary }
            }
          >
            إرجاع عهدة
          </button>
          <button
            onClick={() => setActiveTab("composition")}
            className={`px-6 py-3 rounded-xl text-lg transition`}
            style={
              activeTab === "composition"
                ? { color: accent, fontWeight: "700" }
                : { color: textPrimary }
            }
          >
            ضبط التركيب
          </button>
          <button
            onClick={() => setActiveTab("approval")}
            className={`px-6 py-3 rounded-xl text-lg transition`}
            style={
              activeTab === "approval"
                ? { color: accent, fontWeight: "700" }
                : { color: textPrimary }
            }
          >
            طلبات المواد
          </button>
          <button
            onClick={() => setActiveTab("destruction")}
            className={`px-6 py-3 rounded-xl text-lg transition`}
            style={
              activeTab === "destruction"
                ? { color: accent, fontWeight: "700" }
                : { color: textPrimary }
            }
          >
            مذكرات الاتلاف
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-xl text-lg transition`}
            style={
              activeTab === "all"
                ? { color: accent, fontWeight: "700" }
                : { color: textPrimary }
            }
          >
            عرض الكل
          </button>
        </div>

        <div className="w-full max-w-6xl">
        {activeTab === "custody" && (
            <div className="w-full">
              {scrapNotes.length === 0 ? (
                <div
                  className="text-center py-10"
                  style={{ color: textSecondary }}
                >
                  <p>لا يوجد عهد بعد</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {scrapNotes
                    .slice()
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
                        className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl"
                        onClick={() => handleScrapCardClick(item.id)}
                        style={{
                          backgroundColor: index % 2 === 0 ? cardAlt : cardBase,
                          border: `1px solid ${divider}`,
                          color: textPrimary,
                        }}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الرقم
                            </span>
                            <span
                              style={{ color: accent }}
                              className="font-bold"
                            >
                              {item.serial_number}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              التاريخ
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.date?.slice(0, 10)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              العدد
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.items_count}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              أمين المستودع
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.created_by?.name || "—"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الحالة
                            </span>
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
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
          {activeTab === "approval" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center mr-auto">
              {requestMaterials
                .slice()
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
                    className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between"
                    onClick={() => openModal(card)}
                    style={{
                      backgroundColor: index % 2 === 0 ? cardAlt : cardBase,
                      width: 360,
                      border: `1px solid ${divider}`,
                      color: textPrimary,
                    }}
                  >
                    <div className="space-y-3" dir="rtl">
                      <div className="flex justify-between text-sm">
                        <span
                          style={{ color: textSecondary }}
                          className="font-semibold"
                        >
                          الرقم
                        </span>
                        <span style={{ color: accent }} className="font-bold">
                          {card.serial_number}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span
                          style={{ color: textSecondary }}
                          className="font-semibold"
                        >
                          التاريخ
                        </span>
                        <span style={{ color: textPrimary }}>
                          {card.date?.slice(0, 10)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span
                          style={{ color: textSecondary }}
                          className="font-semibold"
                        >
                          العدد
                        </span>
                        <span style={{ color: textPrimary }}>
                          {card.materials?.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span
                          style={{ color: textSecondary }}
                          className="font-semibold"
                        >
                          من
                        </span>
                        <span style={{ color: textPrimary }}>
                          {card.requested_by?.name || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                        <span
                          style={{ color: textSecondary }}
                          className="font-semibold"
                        >
                          الحالة
                        </span>
                        <span
                          style={{ color: textSecondary }}
                          className="font-semibold"
                        >
                          {card.status}
                        </span>
                      </div>
                      {card.type && (
                        <div className="flex justify-between text-sm items-center">
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            النوع
                          </span>
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
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
                  .slice()
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
                      className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between"
                      onClick={() => handleCardClick(item)}
                      style={{
                        backgroundColor: index % 2 === 0 ? cardAlt : cardBase,
                        border: `1px solid ${divider}`,
                        color: textPrimary,
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            الرقم
                          </span>
                          <span style={{ color: accent }} className="font-bold">
                            {item.serial_number}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            التاريخ
                          </span>
                          <span style={{ color: textPrimary }}>
                            {item.date?.slice(0, 10)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            العدد
                          </span>
                          <span style={{ color: textPrimary }}>
                            {item.materials?.length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            أمين المستودع
                          </span>
                          <span style={{ color: textPrimary }}>
                            {item.created_by?.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            الحالة
                          </span>
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
                            النوع
                          </span>
                          <span
                            style={{ color: textSecondary }}
                            className="font-semibold"
                          >
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
                <div
                  className="text-center py-10"
                  style={{ color: textSecondary }}
                >
                  <p>لا توجد مذكرات إتلاف بعد</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {scrapNotes
                    .slice()
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
                        className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl"
                        onClick={() => handleScrapCardClick(item.id)}
                        style={{
                          backgroundColor: index % 2 === 0 ? cardAlt : cardBase,
                          border: `1px solid ${divider}`,
                          color: textPrimary,
                        }}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الرقم
                            </span>
                            <span
                              style={{ color: accent }}
                              className="font-bold"
                            >
                              {item.serial_number}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              التاريخ
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.date?.slice(0, 10)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              العدد
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.items_count}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              أمين المستودع
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.created_by?.name || "—"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الحالة
                            </span>
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
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
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: accent }}
                >
                  طلبات المواد
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
                  {requestMaterials
                    .slice()
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
                        className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between"
                        onClick={() => openModal(card)}
                        style={{
                          backgroundColor: index % 2 === 0 ? cardAlt : cardBase,
                          width: 360,
                          border: `1px solid ${divider}`,
                          color: textPrimary,
                        }}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الرقم
                            </span>
                            <span
                              style={{ color: accent }}
                              className="font-bold"
                            >
                              {card.serial_number}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              التاريخ
                            </span>
                            <span style={{ color: textPrimary }}>
                              {card.date?.slice(0, 10)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              العدد
                            </span>
                            <span style={{ color: textPrimary }}>
                              {card.materials?.length}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              من
                            </span>
                            <span style={{ color: textPrimary }}>
                              {card.requested_by?.name || "—"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الحالة
                            </span>
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              {card.status}
                            </span>
                          </div>
                          {card.type && (
                            <div className="flex justify-between text-sm items-center">
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
                                النوع
                              </span>
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
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
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: accent }}
                >
                  ضبط التركيب
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {installationReports
                    .slice()
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
                        className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between"
                        onClick={() => handleCardClick(item)}
                        style={{
                          backgroundColor: index % 2 === 0 ? cardAlt : cardBase,
                          border: `1px solid ${divider}`,
                          color: textPrimary,
                        }}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الرقم
                            </span>
                            <span
                              style={{ color: accent }}
                              className="font-bold"
                            >
                              {item.serial_number}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              التاريخ
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.date?.slice(0, 10)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              العدد
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.materials?.length}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              أمين المستودع
                            </span>
                            <span style={{ color: textPrimary }}>
                              {item.created_by?.name}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              الحالة
                            </span>
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              {item.status}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
                              النوع
                            </span>
                            <span
                              style={{ color: textSecondary }}
                              className="font-semibold"
                            >
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
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: accent }}
                >
                  مذكرات الإتلاف
                </h2>
                {scrapNotes.length === 0 ? (
                  <div
                    className="text-center"
                    style={{ color: textSecondary, padding: 40 }}
                  >
                    <p>لا توجد مذكرات إتلاف بعد</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {scrapNotes
                      .slice()
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
                          className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl"
                          onClick={() => handleScrapCardClick(item.id)}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? cardAlt : cardBase,
                            border: `1px solid ${divider}`,
                            color: textPrimary,
                          }}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
                                الرقم
                              </span>
                              <span
                                style={{ color: accent }}
                                className="font-bold"
                              >
                                {item.serial_number}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
                                التاريخ
                              </span>
                              <span style={{ color: textPrimary }}>
                                {item.date?.slice(0, 10)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
                                العدد
                              </span>
                              <span style={{ color: textPrimary }}>
                                {item.items_count}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
                                أمين المستودع
                              </span>
                              <span style={{ color: textPrimary }}>
                                {item.created_by?.name || "—"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
                                الحالة
                              </span>
                              <span
                                style={{ color: textSecondary }}
                                className="font-semibold"
                              >
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

      {/* Sidebar */}
      <div
        className="w-[216px] h-[1050px] shadow-sm p-6 flex flex-col items-center border rounded-[20px] mt-8 mb-8"
        style={{
          backgroundColor: theme.palette.background.paper,
          borderColor: divider,
        }}
      >
        <UserCircleIcon className="w-16 h-16 mb-4" style={{ color: accent }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: textPrimary }}>
          {Name?.name}
        </h2>
        <p style={{ color: textSecondary }} className="mb-4">
          {Role}
        </p>
        <button
          className="px-4 py-2 rounded-lg mb-2 transition w-full"
          style={{
            backgroundColor: accent,
            color: theme.palette.getContrastText(accent),
          }}
        >
          تعديل البروفايل
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg mb-2 transition w-full"
          style={{
            backgroundColor: theme.palette.error?.main || "#EB001B",
            color: theme.palette.getContrastText(
              theme.palette.error?.main || "#EB001B"
            ),
          }}
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Modal */}
      {showModal && currentCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(110, 104, 104, 0.4)" }}
          ></div>
          <div
            className="relative rounded-xl p-6 w-2/5 max-h-[80vh] overflow-y-auto shadow-lg z-50"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: textPrimary,
              border: `1px solid ${divider}`,
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-xl font-bold"
              style={{ color: textSecondary }}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4" style={{ color: accent }}>
              تفاصيل الطلب
            </h2>
            <div className="mb-6 text-sm flex flex-wrap gap-x-6 gap-y-2" dir="rtl">
              <p>
                <strong>الاسم:</strong>{" "}
                <span style={{ color: textPrimary }}>
                  {currentCard.requested_by?.name}
                </span>
              </p>
              <p>
                <strong>قسم:</strong>{" "}
                <span style={{ color: textPrimary }}>
                  {currentCard.requested_by?.department_id}
                </span>
              </p>
              <p>
                <strong>الملاحظات:</strong>{" "}
                <span style={{ color: textPrimary }}>{currentCard.status}</span>
              </p>
            </div>
            <div
              className="space-y-3 mb-6 rounded p-3"
              style={{ backgroundColor: theme.palette.background.paper }}
            >
              <div
                className="flex justify-between font-bold"
                style={{
                  borderBottom: `1px solid ${divider}`,
                  paddingBottom: 8,
                  marginBottom: 8,
                }}
              >
                <span>المادة</span>
                <span>الكمية</span>
                <span>الكود</span>
              </div>
              {tempMaterials.map((mat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center mb-1 px-2 py-1 rounded"
                  style={{
                    backgroundColor: theme.palette.background.card2,
                    color: textPrimary,
                  }}
                >
                  <span style={{ color: textPrimary }}>{mat.name}</span>
                  {editMode ? (
                    <input
                      type="number"
                      min={0}
                      max={mat.quantity}
                      value={mat.quantity}
                      onChange={(e) =>
                        handleQuantityChange(idx, e.target.value)
                      }
                      className="border rounded px-2 py-1 w-20 text-center"
                      style={{
                        borderColor: divider,
                        backgroundColor: theme.palette.background.default,
                        color: textPrimary,
                      }}
                    />
                  ) : (
                    <span style={{ color: textPrimary }}>{mat.quantity}</span>
                  )}
                  <span style={{ color: textPrimary }}>{mat.code}</span>
                </div>
              ))}
            </div>

            {currentCard.status !== "approved" &&
              currentCard.status !== "rejected" && (
                <div className="flex gap-4 justify-center mt-6 flex-wrap">
                  <button
                    onClick={handleReject}
                    className="rounded-xl px-6 py-2 font-bold"
                    style={{
                      backgroundColor: theme.palette.error?.main || "#EB001B",
                      color: theme.palette.getContrastText(
                        theme.palette.error?.main || "#EB001B"
                      ),
                    }}
                  >
                    رفض
                  </button>
                  <button
                    onClick={handleApprove}
                    className="rounded-xl px-6 py-2 font-bold"
                    style={{
                      backgroundColor: theme.palette.success?.main || "#28A745",
                      color: theme.palette.getContrastText(
                        theme.palette.success?.main || "#28A745"
                      ),
                    }}
                  >
                    موافقة
                  </button>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="rounded-xl px-6 py-2 font-bold"
                    style={{
                      backgroundColor: accent,
                      color: theme.palette.getContrastText(accent),
                    }}
                  >
                    {editMode ? "إلغاء التعديل" : "تعديل الكمية"}
                  </button>
                  {editMode && (
                    <button
                      onClick={handleSave}
                      className="rounded-xl px-6 py-2 font-bold"
                      style={{
                        backgroundColor:
                          theme.palette.primary?.main || "#2563EB",
                        color: "#fff"
                      }}
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
