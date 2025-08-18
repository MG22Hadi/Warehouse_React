import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import api from "../../api/axiosInstance";

export default function SignUp({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isManager, setIsManager] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const translateValidationErrors = (errors) => {
    const translated = {};

    if (errors.name) translated.name = "الرجاء إدخال الاسم الكامل.";
    if (errors.email)
      translated.login = "البريد الإلكتروني غير صالح أو مستخدم مسبقًا.";
    if (errors.phone)
      translated.login = "رقم الهاتف غير صالح أو مستخدم مسبقًا.";
    if (errors.password)
      translated.password = "كلمة المرور مطلوبة ويجب أن تكون قوية.";
    if (errors.password_confirmation)
      translated.confirmPassword = "تأكيد كلمة المرور غير مطابق.";

    return translated;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين.";
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const isPhone = /^[0-9]{8,15}$/.test(login);

    if (!isEmail && !isPhone) {
      newErrors.login = "يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح.";
    }

    if (!fullName.trim()) {
      newErrors.fullName = "الرجاء إدخال الاسم الكامل.";
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    const requestBody = {
      name: fullName,
      password: password,
      password_confirmation: confirmPassword,
      type: isManager ? "manager" : "warehouseKeeper",
      platform: "web",
    };

    if (isEmail) requestBody.email = login;
    else if (isPhone) requestBody.phone = login;

    try {
      //this
      // const response = await api.post("/register", requestBody);
      // const result = response.data;
      //or this
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        localStorage.setItem("token", result.data.access_token);
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        switch (result.data.role) {
          case "manager":
            navigate("/dashboard");
            break;
          case "warehouseKeeper":
            navigate("/warehouses");
            break;
          case "user":
            navigate("/data-entry");
            break;
          default:
            navigate("/login");
        }
      } else {
        if (result.errors) {
          setFieldErrors(translateValidationErrors(result.errors));
        } else {
          setFieldErrors({ general: result.message || "فشل إنشاء الحساب." });
        }
      }
    } catch (err) {
      console.error(err);
      setFieldErrors({ general: "حدث خطأ أثناء الاتصال بالخادم." });
    }
  };

  const errorStyle = "text-xs text-red-500 mt-1 text-right";

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
        className="h-screen flex items-center justify-center font-sans px-4"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <div
          className="flex w-[960px] h-[590px] shadow-lg rounded-[30px] overflow-hidden"
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <div className="w-[480px] h-[591px] bg-[#F5F6FA] relative">
            <img
              src="/assets/login/all-login.svg"
              alt="توضيح"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center relative px-8">
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

            <div className="w-[400px] max-w-full">
              <h2
                className="text-[32px] font-bold mb-4 text-right"
                style={{ color: theme.palette.text.primary }}
              >
                إنشاء حساب
              </h2>

              <form className="space-y-5" onSubmit={handleSignUp}>
                {/* الاسم الكامل */}
                <div className="relative">
                  <label
                    htmlFor="fullname"
                    className="block text-sm mb-2 text-right"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    الاسم الكامل
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    dir="rtl"
                    placeholder="أدخل اسمك الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full py-2 pr-10 pl-4 rounded-[22px] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    style={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      color: theme.palette.text.primary,
                    }}
                  />
                  <img
                    src="/assets/login/icons/name.svg"
                    alt="name icon"
                    className="w-5 h-5 absolute right-3 top-[38px] pointer-events-none"
                  />
                  {fieldErrors.fullName && (
                    <p className={errorStyle}>{fieldErrors.fullName}</p>
                  )}
                </div>

                {/* البريد الإلكتروني أو الهاتف */}
                <div className="relative">
                  <label
                    htmlFor="login"
                    className="block text-sm mb-2 text-right"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    البريد الإلكتروني أو رقم الهاتف
                  </label>
                  <input
                    id="login"
                    type="text"
                    dir="rtl"
                    placeholder="أدخل البريد أو الهاتف"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full py-2 pr-10 pl-4 rounded-[22px] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    style={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      color: theme.palette.text.primary,
                    }}
                  />
                  <img
                    src="/assets/login/icons/email.svg"
                    alt="email icon"
                    className="w-5 h-5 absolute right-3 top-[38px] pointer-events-none"
                  />
                  {fieldErrors.login && (
                    <p className={errorStyle}>{fieldErrors.login}</p>
                  )}
                </div>

                {/* كلمة المرور */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 text-right"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    كلمة المرور
                  </label>

                  <div
                    className="flex flex-row-reverse items-center w-full px-3 py-2 rounded-[22px]"
                    style={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {/* أيقونة القفل */}
                    <img
                      src="/assets/login/icons/password.svg"
                      alt="password icon"
                      className="w-5 h-5 ml-2"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      dir="rtl"
                      placeholder="********"
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

                  {fieldErrors.password && (
                    <p className={errorStyle}>{fieldErrors.password}</p>
                  )}
                </div>

                {/* تأكيد كلمة المرور */}
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-2 text-right"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    تأكيد كلمة المرور
                  </label>

                  <div
                    className="flex flex-row-reverse items-center w-full px-3 py-2 rounded-[22px]"
                    style={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {/* أيقونة القفل */}
                    <img
                      src="/assets/login/icons/password.svg"
                      alt="confirm icon"
                      className="w-5 h-5 ml-2"
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      dir="rtl"
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                      style={{
                        color: theme.palette.text.primary,
                      }}
                    />

                    {/* زر الإظهار/الإخفاء */}
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      size="small"
                      sx={{ padding: "2px" }}
                    >
                      {showConfirmPassword ? (
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

                  {fieldErrors.confirmPassword && (
                    <p className={errorStyle}>{fieldErrors.confirmPassword}</p>
                  )}
                </div>

                {/* زر تسجيل */}
                <button
                  type="submit"
                  className="w-full py-2 bg-[#FF8E29] text-white rounded-[22px] hover:bg-[#e07b20] transition duration-200"
                >
                  إنشاء الحساب
                </button>

                {/* رسالة عامة */}
                {fieldErrors.general && (
                  <p className="text-red-500 text-center text-sm mt-2">
                    {fieldErrors.general}
                  </p>
                )}

                {/* زر تبديل نوع الحساب */}
                <div className="text-sm text-center mt-2">
                  {isManager ? (
                    <button
                      type="button"
                      className="text-[#FF8E29] hover:underline"
                      onClick={() => setIsManager(false)}
                    >
                      إنشاء كـ أمين مستودع
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-[#FF8E29] hover:underline"
                      onClick={() => setIsManager(true)}
                    >
                      إنشاء كـ مدير
                    </button>
                  )}
                </div>

                {/* رابط تسجيل الدخول */}
                <div
                  className="text-sm text-center mt-4"
                  style={{ color: theme.palette.text.secondary }}
                >
                  لديك حساب؟{" "}
                  <a href="/" className="text-[#FF8E29] hover:underline">
                    تسجيل الدخول
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
