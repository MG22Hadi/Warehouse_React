import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard";
import InstallUser from "../components/InstallUser";

export default function InstallReportsUserManager() {
  const { warehouseId } = useParams();
  // تم الاحتفاظ بهذه الحالة في حال كان مكون InstallUser يفتح المودال
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleCloseOverlay = () => {
    setSelectedProductId(null);
  };

  const handleApprove = () => {
    alert("تمت الموافقة");
  };

  const handleReject = () => {
    alert("تم الرفض");
  };

  return (
    // نفس التصميم السابق: خلفية الصفحة وتوسيط المحتوى
    <div className="min-h-screen w-full bg-[#FFF4EA] p-8 flex items-center justify-center" dir="rtl">
      
      {/* حاوية بيضاء مع حواف دائرية */}
      <div className="w-full max-w-7xl bg-white rounded-[20px] p-8 shadow-lg">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* تم تغيير العنوان ليعكس المحتوى */}
            {warehouseId ? `تقرير المستخدم (${warehouseId})` : "تقرير المستخدم"}
          </h1>
        </div>

        {/* الجدول في المنتصف - تم استبدال المكون بـ InstallUser */}
        <div>
          <InstallUser />
        </div>

        {/* أزرار الموافقة والرفض */}
        <div className="flex justify-center items-center gap-4 mt-8">
            <button 
                onClick={handleReject}
                className="bg-[#EB001B] text-white font-bold py-2 px-10 rounded-lg hover:bg-[#b30015] transition-colors duration-300"
            >
                رفض
            </button>
            <button 
                onClick={handleApprove}
                className="bg-[#28A745] text-white font-bold py-2 px-10 rounded-lg hover:bg-[#218838] transition-colors duration-300"
            >
                موافقة
            </button>
        </div>
      </div>

      {/* المودال */}
      {selectedProductId && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          onClick={handleCloseOverlay}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ProductDetailsCard id={selectedProductId} />
          </div>
        </div>
      )}
    </div>
  );
}