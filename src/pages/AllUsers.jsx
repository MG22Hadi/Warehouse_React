import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../MainLayout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

export default function AllUsers({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // دوال إضافة
  const handleAddUser = () => navigate("/AddUsers");
  const handleAddSupplier = () => navigate("/AddSupplier");

  // دالة جلب المستخدمين والموردين
  const fetchUsersAndSuppliers = async () => {
    try {
      // جلب المستخدمين
      const resUsers = await axios.get("http://localhost:8000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mappedUsers =
        resUsers.data?.data?.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email || "-",
          address: "-",
          phone: u.phone || "-",
          date: u.created_at?.split("T")[0] || "-",
          social: u.job_title || "مستخدم",
          type: "user",
        })) || [];

      // جلب الموردين
      const resSuppliers = await axios.get(
        "http://localhost:8000/api/suppliers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const mappedSuppliers =
        resSuppliers.data?.data?.suppliers?.map((s) => ({
          id: s.id,
          name: s.name,
          email: "-",
          address: "-",
          phone: s.contact_info || "-",
          date: s.created_at?.split("T")[0] || "-",
          social: "مورد",
          type: "supplier",
        })) || [];

      setUsers([...mappedUsers, ...mappedSuppliers]);
    } catch (err) {
      console.error("خطأ في تحميل المستخدمين والموردين:", err);
      alert("فشل تحميل البيانات.");
    }
  };

  useEffect(() => {
    fetchUsersAndSuppliers();
  }, []);

  // دالة عرض البيانات
  const handleView = async (id, type) => {
    try {
      let url =
        type === "user"
          ? `http://localhost:8000/api/v1/users/${id}`
          : `http://localhost:8000/api/supplier/show/${id}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        alert(JSON.stringify(response.data.data, null, 2));
      }
    } catch (err) {
      console.error("خطأ في جلب البيانات:", err);
      alert("فشل جلب البيانات");
    }
  };

  // دالة تعديل البيانات
  const handleEdit = (id, type) => {
    if (type === "user") navigate(`/AddUsers/${id}`);
    else if (type === "supplier") navigate(`/AddSupplier/${id}`);
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="جميع الموظفين">
      <div
        className="bg-white rounded-[20px] p-6 shadow-md"
        style={{ minHeight: "90vh" }}
      >
        {/* الهيدر + زر إضافة */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-black text-2xl font-bold">
            كل المستخدمين والموردين
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleAddUser}
              style={{ backgroundColor: "#FF8E29", borderRadius: "30px" }}
              className="text-white px-5 py-2 hover:brightness-90 transition"
            >
              أضف موظف
            </button>
            <button
              onClick={handleAddSupplier}
              style={{ backgroundColor: "#FF8E29", borderRadius: "30px" }}
              className="text-white px-5 py-2 hover:brightness-90 transition"
            >
              أضف مورد
            </button>
          </div>
        </div>

        {/* الجدول */}
        <div className="bg-white rounded-[20px] p-4 mb-6 shadow-sm border border-gray-200">
          {/* العناوين */}
          <div className="grid grid-cols-7 gap-4 text-black font-semibold text-base border-b border-gray-300 pb-2 mb-2 text-center">
            <div>الاسم</div>
            <div>البريد الإلكتروني</div>
            <div>العنوان</div>
            <div>رقم الهاتف</div>
            <div>التاريخ</div>
            <div>المسمى الوظيفي</div>
            <div>إجراءات</div>
          </div>

          {/* صفوف البيانات */}
          {users.length === 0 ? (
            <p className="text-center text-gray-500 mt-6 text-lg">
              لا يوجد مستخدمين أو موردين لعرضهم
            </p>
          ) : (
            users.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-4 text-[#6F757E] text-sm py-3 border-b last:border-b-0 border-gray-200 text-center"
              >
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.address}</div>
                <div>{user.phone}</div>
                <div>{user.date}</div>
                <div>{user.social}</div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleView(user.id, user.type)}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                    title="عرض"
                  >
                    <VisibilityIcon style={{ fontSize: 18 }} />
                  </button>
                  <button
                    onClick={() => handleEdit(user.id, user.type)}
                    className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                    title="تعديل"
                  >
                    <EditIcon style={{ fontSize: 18 }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
