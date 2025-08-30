import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import api from "../../api/axiosInstance";
import { BASE_URL } from "../../api/axiosInstance.js";

export default function Login({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [isManager, setIsManager] = useState(false); 

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //this
      //   const response = await api.post("/login", {
      //   login: login,
      //   password: password,
      //   type: isManager ? "manager" : "warehouseKeeper",
      //   platform: "web",
      // });

      // const result = response.data;
      //or this
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
          type: isManager ? "manager" : "warehouseKeeper",
          platform: "web",
        }),
      });

      const result = await response.json();
      /////
      if (result.success) {
        localStorage.setItem("token", result.data.access_token);
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        switch (result.data.role) {
          case "manager":
            navigate("/Manager");
            break;
          case "warehouseKeeper":
            navigate("/dashboard");
            break;
          case "user":
            navigate("/data-entry");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("فشل تسجيل الدخول، تأكد من البيانات.");
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الاتصال بالخادم.");
    }
  };

  return (
    <>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        className="absolute top-4 left-4 z-50"
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>

      <div
        className="h-screen flex items-center justify-center font-sans px-4 pb-10 overflow-hidden"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <div
          className="flex w-[960px] h-[560px] shadow-lg rounded-[30px] overflow-hidden"
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <div className="w-[479.77px] h-[560px] bg-[#F5F6FA] relative">
            <img
              src="/assets/login/all-login.svg"
              alt="Login Illustration"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          <div className="w-[480px] flex flex-col items-center justify-center relative px-10">
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <img src="/assets/logo.png" alt="شعار" className="w-8 h-8" />
              <span
                className="text-xl font-bold"
                style={{ color: theme.palette.text.primary }}
              >
                RockStock
              </span>
            </div>

            <div className="w-full max-w-[330px]">
              <h2
                className="text-[32px] font-bold mb-8 text-center"
                style={{ color: theme.palette.text.primary }}
              >
                تسجيل الدخول
              </h2>

              <form className="space-y-5" onSubmit={handleLogin}>
                {/* رقم الهاتف او بريد إلكتروني*/}
                <div>
                  <label
                    htmlFor="login"
                    className="block text-sm mb-2 text-right"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    رقم الهاتف أو البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="login"
                      placeholder="أدخل رقم الهاتف أو البريد الإلكتروني"
                      className="w-full pr-10 pl-4 py-2 rounded-[22px] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      dir="rtl"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      style={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        color: theme.palette.text.primary,
                      }}
                    />
                    <img
                      src="/assets/login/icons/email.svg"
                      alt="login"
                      className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
                {/* كلمة المرور */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 text-right"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    كلمة المرور
                  </label>

                  <div
                    className="w-full flex flex-row-reverse items-center px-3 py-2 rounded-[22px]"
                    style={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <img
                      src="/assets/login/icons/password.svg"
                      alt="password"
                      className="w-5 h-5 ml-2"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="********"
                      dir="rtl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                      style={{
                        color: theme.palette.text.primary,
                      }}
                    />

                    {/* زر الإظهار/الإخفاء */}
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                      sx={{ padding: "2px" }}
                    >
                      {showPassword ? (
                        <VisibilityOff
                          fontSize="small"
                          style={{ color: theme.palette.text.secondary }}
                        />
                      ) : (
                        <Visibility
                          fontSize="small"
                          style={{ color: theme.palette.text.secondary }}
                        />
                      )}
                    </IconButton>
                  </div>
                </div>

                <div
                  className="flex justify-end text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  <a
                    href="/reset-password"
                    className="text-[#FF8E29] hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#FF8E29] text-white rounded-[22px] hover:bg-[#e07b20] transition duration-200"
                >
                  تسجيل الدخول
                </button>

                {error && (
                  <p className="text-red-500 text-center text-sm">{error}</p>
                )}

                {/* رابط تبديل نوع المستخدم */}
                <div className="text-sm text-center mt-2">
                  {isManager ? (
                    <button
                      type="button"
                      className="text-[#FF8E29] hover:underline"
                      onClick={() => setIsManager(false)}
                    >
                      تسجيل الدخول كأمين مستودع
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-[#FF8E29] hover:underline"
                      onClick={() => setIsManager(true)}
                    >
                      تسجيل الدخول كمدير
                    </button>
                  )}
                </div>

                <div
                  className="text-sm text-center mt-4"
                  style={{ color: theme.palette.text.secondary }}
                >
                  لا تملك حسابًا؟{" "}
                  <a href="/signup" className="text-[#FF8E29] hover:underline">
                    إنشاء حساب
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
