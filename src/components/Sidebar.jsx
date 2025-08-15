import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [showWarehouses, setShowWarehouses] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [showInstallReports, setShowInstallReports] = useState(false);

  const isActive = (path) => location.pathname === path;

  // جلب المستودعات
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/warehouses/index", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWarehouses(
          res.data.data.sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch((err) => {
        console.error("خطأ في جلب المستودعات:", err);
      });
  }, []);

  // فتح قسم ضبط التركيب إذا كان على صفحة فرعية
  useEffect(() => {
    if (
      location.pathname === "/InstallReportsUser" ||
      location.pathname === "/InstallReportsStore"
    ) {
      setShowInstallReports(true);
    }
  }, [location.pathname]);

  const menuItemsBeforeInstall = [
    {
      icon: <img src="/assets/icons-dashboard/Home.svg" className="w-4 h-4" />,
      label: "الصفحة الرئيسية",
      path: "/dashboard",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/calendar.svg" className="w-4 h-4" />
      ),
      label: "التقويم",
      path: "/calendar",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/EntryNotes.svg" className="w-4 h-4" />
      ),
      label: "اضافة منتج",
      path: "/AddProduct1",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/EntryNotes.svg" className="w-4 h-4" />
      ),
      label: "مذكرات إدخال",
      path: "/AllEntry",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/ExNotes.svg" className="w-4 h-4" />
      ),
      label: "مذكرات إخراج",
      path: "/AllExit",
    },
    {
      icon: (
        <img
          src="/assets/icons-dashboard/ReceivNotes.svg"
          className="w-4 h-4"
        />
      ),
      label: "مذكرات الاستلام",
      path: "/AllReceiving",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/ScrapNote.svg" className="w-4 h-4" />
      ),
      label: "مذكرات إتلاف",
      path: "/AllScrap",
    },
  ];

  const menuItemsAfterInstall = [
    {
      icon: (
        <img src="/assets/icons-dashboard/PurRequest.svg" className="w-4 h-4" />
      ),
      label: "طلبات الشراء",
      path: "/AllPurchase",
    },
    {
      icon: (
        <img
          src="/assets/icons-dashboard/CuManagment.svg"
          className="w-4 h-4"
        />
      ),
      label: "العهدة الشخصية",
      path: "/AllCustody",
    },
    {
      icon: (
        <img
          src="/assets/icons-dashboard/notification.svg"
          className="w-4 h-4"
        />
      ),
      label: "الإشعارات",
      path: "/Notification",
    },
    {
      icon: <img src="/assets/icons-dashboard/User.svg" className="w-4 h-4" />,
      label: "المستخدمين",
      path: "/users",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/Settings.svg" className="w-4 h-4" />
      ),
      label: "الإعدادات",
      path: "/settings",
    },
  ];

  return (
    <div
      className="w-[218px] pt-[37px] pb-[37px] pl-[30px] pr-[30px]"
      dir="rtl"
    >
      <div
        className="w-[200px] h-full flex flex-col justify-between py-5 px-5 rounded-[30px] font-sans shadow-lg"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {/* الشعار */}
        <div className="flex items-center justify-center mb-6">
          <img src="/assets/logo.png" alt="شعار" className="w-6 h-6" />
          <span className="text-sm font-semibold ml-2">RockStock</span>
        </div>

        {/* القائمة */}
        <ul className="flex-1 space-y-3 text-xs font-medium">
          {/* القائمة قبل ضبط التركيب */}
          {menuItemsBeforeInstall.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                isActive(item.path) ? "bg-[#FF8E29]" : "hover:bg-[#FF8E29]"
              }`}
              style={{
                color: isActive(item.path)
                  ? "#FFFFFF"
                  : theme.palette.mode === "dark"
                  ? "#CCCDCD"
                  : "#6F757E",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path))
                  e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path))
                  e.currentTarget.style.color =
                    theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E";
              }}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </li>
          ))}

          {/* المنتجات (منسدلة) */}
          <li>
            <div
              onClick={() => setShowWarehouses((prev) => !prev)}
              className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                location.pathname.startsWith("/products")
                  ? "bg-[#FF8E29]"
                  : "hover:bg-[#FF8E29]"
              }`}
              style={{
                color: location.pathname.startsWith("/products")
                  ? "#FFFFFF"
                  : theme.palette.mode === "dark"
                  ? "#CCCDCD"
                  : "#6F757E",
              }}
              onMouseEnter={(e) => {
                if (!location.pathname.startsWith("/products"))
                  e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                if (!location.pathname.startsWith("/products"))
                  e.currentTarget.style.color =
                    theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E";
              }}
            >
              <div className="flex items-center gap-2">
                <img
                  src="/assets/icons-dashboard/Products.svg"
                  className="w-4 h-4"
                />
                <span className="truncate">المنتجات</span>
              </div>
              <img
                src="/assets/icons-dashboard/arrow.png"
                alt="سهم"
                className={`w-[14px] h-[8.75px] transition-transform duration-300 ${
                  showWarehouses ? "" : "rotate-180"
                }`}
              />
            </div>

            {showWarehouses && (
              <ul className="mt-2 pr-6 space-y-1 text-sm text-right">
                <li
                  className="cursor-pointer rounded-md px-2 py-1 transition hover:bg-[#FF8E29]"
                  style={{
                    color:
                      location.pathname === "/products"
                        ? theme.palette.mode === "dark"
                          ? "#FFFFFF"
                          : "#3C3C3C"
                        : theme.palette.mode === "dark"
                        ? "#CCCDCD"
                        : "#6F757E",
                  }}
                  onClick={() => {
                    navigate("/products");
                    setShowWarehouses(false);
                  }}
                >
                  جميع المنتجات
                </li>

                {warehouses.map((wh) => (
                  <li
                    key={wh.id}
                    className="cursor-pointer rounded-md px-2 py-1 transition hover:bg-[#FF8E29]"
                    style={{
                      color:
                        location.pathname === `/products/warehouse/${wh.id}`
                          ? theme.palette.mode === "dark"
                            ? "#FFFFFF"
                            : "#3C3C3C"
                          : theme.palette.mode === "dark"
                          ? "#CCCDCD"
                          : "#6F757E",
                    }}
                    onClick={() => {
                      navigate(`/products/warehouse/${wh.id}`);
                      setShowWarehouses(false);
                    }}
                  >
                    {wh.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* ضبط التركيب (من الكود الثاني) */}
          <li>
            <div
              onClick={() => {
                if (showInstallReports) {
                  setShowInstallReports(false);
                } else {
                  setShowInstallReports(true);
                  if (location.pathname !== "/AllInstall") {
                    navigate("/AllInstall");
                  }
                }
              }}
              className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-all duration-200
                ${
                  showInstallReports ||
                  location.pathname === "/AllInstall" ||
                  location.pathname === "/InstallReportsUser" ||
                  location.pathname === "/InstallReportsStore"
                    ? "bg-[#FF8E29]"
                    : "hover:bg-[#FF8E29]"
                }
                ${showInstallReports ? "rounded-t-[8px]" : "rounded-[8px]"}
              `}
              style={{
                color:
                  showInstallReports ||
                  location.pathname === "/AllInstall" ||
                  location.pathname === "/InstallReportsUser" ||
                  location.pathname === "/InstallReportsStore"
                    ? "#FFFFFF"
                    : theme.palette.mode === "dark"
                    ? "#CCCDCD"
                    : "#6F757E",
              }}
              onMouseEnter={(e) => {
                if (
                  !showInstallReports &&
                  location.pathname !== "/AllInstall" &&
                  location.pathname !== "/InstallReportsUser" &&
                  location.pathname !== "/InstallReportsStore"
                ) {
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                if (
                  !showInstallReports &&
                  location.pathname !== "/AllInstall" &&
                  location.pathname !== "/InstallReportsUser" &&
                  location.pathname !== "/InstallReportsStore"
                ) {
                  e.currentTarget.style.color =
                    theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E";
                }
              }}
            >
              <div className="flex items-center gap-2">
                <img
                  src="/assets/icons-dashboard/InstallReportsUser.svg"
                  className="w-4 h-4"
                />
                <span className="truncate">ضبط التركيب</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-[20px] h-[20px] transition-transform duration-300 ${
                  showInstallReports ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{
                  color:
                    showInstallReports ||
                    location.pathname === "/AllInstall" ||
                    location.pathname === "/InstallReportsUser" ||
                    location.pathname === "/InstallReportsStore"
                      ? "#FFFFFF"
                      : "#6F757E",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>

            {showInstallReports && (
              <ul
                className="mt-0 pr-1 pb-1 space-y-1 text-right rounded-b-[8px] overflow-hidden"
                style={{
                  backgroundColor: "#FF8E29",
                }}
              >
                <li
                  className={`cursor-pointer px-4 py-2 transition text-[16px] font-medium ${
                    location.pathname === "/InstallReportsUser"
                      ? "text-white"
                      : "text-[#FFC794] hover:text-white"
                  }`}
                  onClick={() => navigate("/InstallReportsUser")}
                >
                  شراء
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 transition text-[16px] font-medium ${
                    location.pathname === "/InstallReportsStore"
                      ? "text-white"
                      : "text-[#FFC794] hover:text-white"
                  }`}
                  onClick={() => navigate("/InstallReportsStore")}
                >
                  استخدام من المستودع
                </li>
              </ul>
            )}
          </li>

          {/* القائمة بعد ضبط التركيب */}
          {menuItemsAfterInstall.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                isActive(item.path) ? "bg-[#FF8E29]" : "hover:bg-[#FF8E29]"
              }`}
              style={{
                color: isActive(item.path)
                  ? "#FFFFFF"
                  : theme.palette.mode === "dark"
                  ? "#CCCDCD"
                  : "#6F757E",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path))
                  e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path))
                  e.currentTarget.style.color =
                    theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E";
              }}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* تسجيل الخروج */}
        <div
          className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition text-xs"
          style={{ color: theme.palette.error.main }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.palette.error.light;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <img
            src="/assets/icons-dashboard/logout.svg"
            alt="أيقونة"
            className="w-4 h-4"
          />
          <span>تسجيل الخروج</span>
        </div>
      </div>
    </div>
  );
}
