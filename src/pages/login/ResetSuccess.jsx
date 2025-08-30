import React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { BASE_URL } from "../../api/axiosInstance.js";

export default function ResetSuccess({ mode, toggleTheme }) {
  const theme = useTheme();

  return (
    <>
      {/* زر تبديل الثيم */}
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        className="absolute top-4 left-4 z-50"
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>

     
    <div
      className="h-screen flex items-center justify-center font-sans px-4"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      {/* الصندوق الرئيسي */}
      <div
        className="flex w-[960px] h-[560px] shadow-lg rounded-[30px] overflow-hidden"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        {/* القسم الأيسر - الصورة */}
        <div className="w-[480px] h-[560px] bg-[#F5F6FA] relative">
          <img
            src="/assets/login/all-login.svg"
            alt="توضيح"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* القسم الأيمن - المحتوى */}
        <div className="w-1/2 flex flex-col items-center justify-center relative px-8">
          {/* الشعار في الزاوية العلوية اليسرى */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="شعار RockStock"
              className="w-8 h-8"
            />
            <span
              className="text-xl font-bold"
              style={{ color: theme.palette.text.primary }}
            >
              RockStock
            </span>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="w-[400px] max-w-full text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/assets/Success.png"
                alt="نجاح"
                className="w-[100px] h-[91.67px]"
              />
            </div>

            <h2
              className="text-[32px] font-bold mb-4"
              style={{ color: theme.palette.text.primary }}
            >
              تمت إعادة تعيين كلمة المرور بنجاح
            </h2>

            <p
              className="text-sm mb-8"
              style={{ color: theme.palette.text.secondary }}
            >
              يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة
            </p>

            <a
              href="/"
              className="inline-block w-full py-2 rounded-xl text-white transition duration-200"
              style={{
                backgroundColor: "#FF8E29",
              }}
            >
              تسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
