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

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = localStorage.getItem("token"); // أو اسم التوكن عندك

    axios
      .get("http://localhost:8000/api/warehouses/index", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("المستودعات:", res.data);
        setWarehouses(
          res.data.data.sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch((err) => {
        console.error("خطأ في جلب المستودعات:", err);
      });
  }, []);

  const menuItems = [
    // {
    //   icon: <img src="/assets/icons-dashboard/Home.svg" className="w-4 h-4" />,
    //   label: "الصفحة الرئيسية",
    //   path: "/dashboard",
    // },
    // {
    //   icon: (
    //     <img src="/assets/icons-dashboard/Products.svg" className="w-4 h-4" />
    //   ),
    //   label: "المنتجات",
    //   path: "/products",
    // },
    {
      icon: (
        <img src="/assets/icons-dashboard/Settings.svg" className="w-4 h-4" />
      ),
      label: "المستودعات",
      path: "/warehouses",
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
      label: "مذكرات إدخال",
      path: "/entry-notes",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/ExNotes.svg" className="w-4 h-4" />
      ),
      label: "مذكرات إخراج",
      path: "/exit-notes",
    },
    {
      icon: (
        <img
          src="/assets/icons-dashboard/ReceivNotes.svg"
          className="w-4 h-4"
        />
      ),
      label: "المذكرات المستلمة",
      path: "/received-notes",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/ScrapNote.svg" className="w-4 h-4" />
      ),
      label: "مذكرات إتلاف",
      path: "/scrap-notes",
    },
    {
      icon: (
        <img
          src="/assets/icons-dashboard/InstallReports.svg"
          className="w-4 h-4"
        />
      ),
      label: "تقارير التثبيت",
      path: "/install-reports",
    },
    {
      icon: (
        <img src="/assets/icons-dashboard/PurRequest.svg" className="w-4 h-4" />
      ),
      label: "طلبات الشراء",
      path: "/purchase-requests",
    },
    {
      icon: (
        <img
          src="/assets/icons-dashboard/CuManagment.svg"
          className="w-4 h-4"
        />
      ),
      label: "أمين المستودع",
      path: "/warehouse-manager",
    },
    {
      icon: (
        <img
          src="/assets/icons-dashboard/notification.svg"
          className="w-4 h-4"
        />
      ),
      label: "الإشعارات",
      path: "/notifications",
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
          {/* الصفحة الرئيسية */}
          <li
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
              isActive("/dashboard") ? "bg-[#FF8E29]" : "hover:bg-[#FF8E29]"
            }`}
            style={{
              color: isActive("/dashboard")
                ? "#FFFFFF"
                : theme.palette.mode === "dark"
                ? "#CCCDCD"
                : "#6F757E",
            }}
            onMouseEnter={(e) => {
              if (!isActive("/dashboard"))
                e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              if (!isActive("/dashboard"))
                e.currentTarget.style.color =
                  theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E";
            }}
          >
            <img src="/assets/icons-dashboard/Home.svg" className="w-4 h-4" />
            <span className="truncate">الصفحة الرئيسية</span>
          </li>

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

            {/* المستودعات */}
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

          {/* بقية العناصر */}
          {menuItems.map((item, index) => (
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
