import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

const staticProductData = {
  id: 1,
  name: "لابتوب HP ProBook",
  quantity: 10,
  code: "HP-PRO-123",
};

export default function SortingMaterialsForm() {
  const theme = useTheme();
  const [products] = useState(
    Array(12).fill(staticProductData) 
  );

  const cardColors = ["#FFF4EA", "#F5F5F5"]; 

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-20 justify-start">
        {products.map((product, index) => (
          <div
            key={index}
            className="rounded-xl p-5 shadow-lg w-[300px] flex flex-col justify-between h-[280px]"
            style={{ backgroundColor: cardColors[index % 2] }}
            dir="rtl"
          >
            {/* 🖼 الصورة وكود المادة في نفس السطر */}
            <div className="flex justify-between items-center mb-5">
              <div className="w-[50px] h-[50px] rounded-md overflow-hidden">
                <img
                  src="/assets/Product-icon.png"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-400">{product.code}</span>
            </div>

            {/* اسم المنتج */}
            <span
              className="text-sm font-semibold mb-4"
              style={{ color: theme.palette.text.primary }}
            >
              {product.name}
            </span>

            {/* الكمية */}
            <span className="text-sm text-gray-600 mb-6">
              الكمية :  {product.quantity}
            </span>

            {/* زر فرز المنتج في الأسفل */}
            <button
              className=" text-[#FF8E29] rounded-xl px-6 py-2 font-bold hover:text-[#e07a1b]"
              
            >
              فرز المنتج
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
