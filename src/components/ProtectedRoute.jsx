import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  const location = useLocation();

  // إذا خزنت الـ role كـ JSON (مثلاً {"role":"warehouse"}) حاول تفك الـ JSON بأمان:
  try {
    const maybe = JSON.parse(role);
    if (maybe && typeof maybe === "object" && maybe.role) role = maybe.role;
  } catch (e) {
    // إذا مش JSON نكمل بالقيمة كما هي
  }

  // غير مسجل -> روح للـ login (عندك login على "/")
  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // ما عنده صلاحية -> نعرض 404 (حسب طلبك نُخفي الصفحة بدل 403)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <NotFound />;
  }

  return children;
}
