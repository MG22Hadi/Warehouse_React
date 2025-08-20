import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import MainLayout from "../MainLayout";

export default function AllUsers({ mode, toggleTheme }) {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/AddUsers");
  };

  const users = [
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مستخدم" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مورد" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مستخدم" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مورد" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مستخدم" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مورد" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مستخدم" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مورد" },
    { name: "ملك مبارك", email: "malak@example.com", address: "دمشق", phone: "01012345678", date: "2025-08-18", social: "مستخدم" },
  ];

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="جميع الموظفين">
      <div className="bg-white rounded-[20px] p-6 shadow-md" style={{ minHeight: "90vh" }}>
        {/* الهيدر + زر إضافة موظف */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-black text-2xl font-bold">كل المستخدمين</h1>
          <button
            onClick={handleAddUser}
            style={{
              backgroundColor: "#FF8E29",
              borderRadius: "30px",
            }}
            className="text-white px-5 py-2 hover:brightness-90 transition"
          >
            أضف موظف / مورد
          </button>
        </div>

        {/* الكونتينر الجديد العلوي */}
        <div className="bg-white rounded-[20px] p-4 mb-6 shadow-sm border border-gray-200">
          {/* العناوين */}
          <div className="grid grid-cols-6 gap-4 text-black font-semibold text-base border-b border-gray-300 pb-2 mb-2 text-center">
            <div>الاسم</div>
            <div>البريد الإلكتروني</div>
            <div>العنوان</div>
            <div>رقم الهاتف</div>
            <div>التاريخ</div>
            <div>المسمى الوظيفي</div>
          </div>

          {/* صفوف البيانات */}
          {users.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 text-[#6F757E] text-sm py-3 border-b last:border-b-0 border-gray-200 text-center"
            >
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.address}</div>
              <div>{user.phone}</div>
              <div>{user.date}</div>
              <div>{user.social}</div>
            </div>
          ))}
        </div>

        
        <div className="flex justify-end gap-250 mt-4 items-center">
         
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#FF8E29] flex items-center justify-center text-white font-semibold">
              1
            </div>
            <span className="text-[#6F757E] font-medium">السابق</span>
          </div>

          
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#FF8E29] font-semibold">
              2
            </div>
            <span className="text-[#FF8E29] font-medium">التالي</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
