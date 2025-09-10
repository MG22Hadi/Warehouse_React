import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../api/axiosInstance.js";

export default function Navbar({ mode, toggleTheme, pageTitle }) {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
            `${BASE_URL}/warehouse-keeper/me`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );
        setData(response.data?.data || []);
      } catch (error) {
        console.error("خطأ في جلب بيانات المستخدم:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="flex items-center justify-between h-[45px] mt-6 mx-6 px-8">
      {/* يسار: اسم الصفحة والبحث */}
      <div className="flex items-center gap-[50px]">
        <div
          className="text-[#1E293B] text-[20px] font-semibold w-[101px] h-[26px]"
          style={{
            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#050F24",
          }}
        >
          {pageTitle}
        </div>

        <div
          className="flex items-center border border-[#E2E8F0] rounded-full px-4 w-[330px] h-[45px]"
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <input
            type="text"
            placeholder="ابحث..."
            className="w-full h-full outline-none text-sm text-right bg-transparent placeholder:text-[#94A3B8]"
          />
          <img
            src="/assets/icons-dashboard/search.svg"
            alt="بحث"
            className="w-4 h-4 ml-2"
          />
        </div>
      </div>

      {/* يمين: المستخدم والثيم */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="/assets/icons-dashboard/user-avatar.png"
          alt="صورة المستخدم"
          className="w-[45px] h-[45px] rounded-full object-cover"
        />
        <div className="text-right">
          <p
            className="text-sm font-semibold"
            style={{ backgroundColor: theme.palette.background.default }}
          >
            {data.name}
          </p>
          <p className="text-xs text-[#64748B]">أمين المستودع</p>
        </div>
        <img
          src="/assets/icons-dashboard/dropdown.svg"
          alt="سهم"
          className="w-4 h-4"
        />
        <IconButton onClick={toggleTheme} color="inherit" size="small">
          {mode === "light" ?   <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </div>
    </div>
  );
}
