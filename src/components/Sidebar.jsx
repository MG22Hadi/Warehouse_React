import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";

const menuItems = [
  { icon: <HomeIcon />, label: "الصفحة الرئيسية", path: "/Dashboard" },
  { icon: <CalendarMonthIcon />, label: "التقويم", path: "/calendar" },
  { icon: <AddBoxIcon />, label: "اضافة منتج", path: "/AddProduct1" },
  { icon: <DescriptionIcon />, label: "مذكرات إدخال", path: "/AllEntry" },
  { icon: <AssignmentIcon />, label: "مذكرات إخراج", path: "/AllExit" },
  { icon: <InventoryIcon />, label: "مذكرات الاستلام", path: "/AllReceiving" },
  { icon: <DeleteIcon />, label: "مذكرات إتلاف", path: "/AllScrap" },
  { icon: <ShoppingCartIcon />, label: "طلبات الشراء", path: "/AllPurchase" },
  { icon: <AccountBoxIcon />, label: "العهدة الشخصية", path: "/AllCustody" },
  { icon: <NotificationsIcon />, label: "الإشعارات", path: "/Notification" },
  { icon: <PeopleIcon />, label: "المستخدمين", path: "/users" },
  { icon: <SettingsIcon />, label: "الإعدادات", path: "/Settings" },
];

export default function Sidebar() {
  const [hoverInstall, setHoverInstall] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showInstallReports, setShowInstallReports] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (
      location.pathname === "/InstallReportsUser" ||
      location.pathname === "/InstallReportsStore"
    ) {
      setShowInstallReports(true);
    }
  }, [location.pathname]);

  return (
    <div className="w-[218px] pt-[37px] pb-[37px] pl-[30px] pr-[30px]" dir="rtl">
      <div
        className="w-[200px] h-full flex flex-col justify-between py-5 px-5 rounded-[30px] font-sans shadow-lg"
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <div className="flex items-center justify-center mb-6">
          <img src="/assets/logo.png" alt="شعار" className="w-6 h-6" />
          <span className="text-sm font-semibold ml-2">RockStock</span>
        </div>

        <ul className="flex-1 space-y-3 text-xs font-medium">
          {menuItems
            .filter((item) =>
              [
                "الصفحة الرئيسية",
                "التقويم",
                "اضافة منتج",
                "مذكرات إدخال",
                "مذكرات إخراج",
                "مذكرات الاستلام",
                "مذكرات إتلاف",
              ].includes(item.label)
            )
            .map((item, index) => (
              <li
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                  isActive(item.path) ? "bg-[#FF8E29]" : "hover:bg-[#FF8E29]"
                }`}
                style={{
                  color: isActive(item.path) ? "#FFFFFF" : theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path))
                    e.currentTarget.style.color = theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E";
                }}
              >
                {React.cloneElement(item.icon, {
                  style: { color: isActive(item.path) ? "#FFFFFF" : undefined },
                  className: "w-4 h-4",
                })}
                <span className="truncate">{item.label}</span>
              </li>
            ))}

          <li>
          <div
  onClick={() => setShowInstallReports(!showInstallReports)}
  onMouseEnter={() => setHoverInstall(true)}
  onMouseLeave={() => setHoverInstall(false)}
  className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-all duration-200 ${
    showInstallReports ||
    location.pathname === "/AllInstall" ||
    location.pathname === "/InstallReportsUser" ||
    location.pathname === "/InstallReportsStore"
      ? "bg-[#FF8E29]"
      : "hover:bg-[#FF8E29]"
  } ${showInstallReports ? "rounded-t-[8px]" : "rounded-[8px]"}`}
  style={{
    color:
      hoverInstall ||
      showInstallReports ||
      location.pathname === "/AllInstall" ||
      location.pathname === "/InstallReportsUser" ||
      location.pathname === "/InstallReportsStore"
        ? "#FFFFFF"
        : theme.palette.mode === "dark"
        ? "#CCCDCD"
        : "#6F757E",
  }}
>
  <div className="flex items-center gap-2">
    <BuildIcon
      className="w-4 h-4"
      style={{
        color:
          hoverInstall ||
          showInstallReports ||
          location.pathname === "/AllInstall" ||
          location.pathname === "/InstallReportsUser" ||
          location.pathname === "/InstallReportsStore"
            ? "#FFFFFF"
            : theme.palette.mode === "dark"
            ? "#CCCDCD"
            : "#6F757E",
      }}
    />
    <span className="truncate">
      ضبط التركيب
    </span>
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
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
</div>

            {showInstallReports && (
              <ul className="mt-0 pr-1 pb-1 space-y-1 text-right rounded-b-[8px] overflow-hidden" style={{ backgroundColor: "#FF8E29" }}>
                <li
                  className={`cursor-pointer px-4 py-2 transition text-[16px] font-medium ${
                    location.pathname === "/InstallReportsUser" ? "text-white" : "text-[#FFC794] hover:text-white"
                  }`}
                  onClick={() => navigate("/InstallReportsUser")}
                >
                  شراء
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 transition text-[16px] font-medium ${
                    location.pathname === "/InstallReportsStore" ? "text-white" : "text-[#FFC794] hover:text-white"
                  }`}
                  onClick={() => navigate("/InstallReportsStore")}
                >
                  استخدام من المستودع
                </li>
              </ul>
            )}
          </li>

          {menuItems
            .filter((item) =>
              ["طلبات الشراء", "العهدة الشخصية", "الإشعارات", "المستخدمين", "الإعدادات"].includes(item.label)
            )
            .map((item, index) => (
              <li
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                  isActive(item.path) ? "bg-[#FF8E29]" : "hover:bg-[#FF8E29]"
                }`}
                style={{
                  color: isActive(item.path) ? "#FFFFFF" : theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path))
                    e.currentTarget.style.color = theme.palette.mode === "dark" ? "#CCCDCD" : "#6F757E";
                }}
              >
                {React.cloneElement(item.icon, {
                  style: { color: isActive(item.path) ? "#FFFFFF" : undefined },
                  className: "w-4 h-4",
                })}
                <span className="truncate">{item.label}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
