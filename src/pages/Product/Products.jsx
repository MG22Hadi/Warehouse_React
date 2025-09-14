import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../MainLayout";
import ProductDetailsCard from "./ProductDetailsCard";
// import AddProductModal from "./AddProductModal";
// import AddProduct1 from "../AddProduct1";
import FilterBar from "./FilterBar";
import axios from "axios";
import { BASE_URL } from "../../api/axiosInstance.js";

export default function Products({ mode, toggleTheme }) {
  const theme = useTheme();
  const { warehouseId } = useParams();

  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/Addproduct1");
  };
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [warehouseName, setWarehouseName] = useState("");
  const [filters, setFilters] = useState({});

  const token = localStorage.getItem("token");

  const fetchProducts = async (appliedFilters = {}) => {
    try {
      if (warehouseId) {
        const res = await axios.get(
          `${BASE_URL}/warehouses/show/${warehouseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let stock = res.data?.data?.warehouse?.stock || [];

        // حوّل لـ مصفوفة منتجات مع الكمية
        let mappedProducts = stock.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));

        // فلترة بالـ frontend
        if (appliedFilters.consumable !== undefined) {
          mappedProducts = mappedProducts.filter(
            (p) =>
              p.consumable ===
              (appliedFilters.consumable === "true" ||
                appliedFilters.consumable === 1)
          );
        }

        if (appliedFilters.code) {
          mappedProducts = mappedProducts.filter((p) =>
            p.code.includes(appliedFilters.code)
          );
        }

        if (appliedFilters.name) {
          mappedProducts = mappedProducts.filter((p) =>
            p.name.includes(appliedFilters.name)
          );
        }

        setProducts(mappedProducts);
      } else {
        // حالة عرض جميع المنتجات (الـ API فيه فلترة جاهزة)
        const res = await axios.get(`${BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: appliedFilters,
        });

        setProducts(res.data?.data?.products || []);
      }
    } catch (err) {
      console.error("خطأ في تحميل المنتجات:", err);
      alert("فشل تحميل المنتجات.");
    }
  };

  const fetchWarehouseName = async () => {
    if (!warehouseId) return;
    try {
      const res = await axios.get(
        `${BASE_URL}/warehouses/show/${warehouseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWarehouseName(res.data?.data?.warehouse?.name || "");
    } catch (err) {
      console.error("خطأ في تحميل اسم المستودع:", err);
    }
  };

  useEffect(() => {
    console.log("Warehouse ID:", warehouseId);
    fetchProducts(filters);
    fetchWarehouseName();
  }, [warehouseId]);

  // const handleFilter = (newFilters) => {
  //   setFilters(newFilters);
  //   fetchProducts(newFilters);
  // };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف المنتج؟");
    if (!confirmed) return;

    try {
      await axios.delete(`${BASE_URL}/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("فشل في حذف المنتج:", err);
      alert("فشل حذف المنتج.");
    }
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="المنتجات">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <div className="flex justify-between items-center mb-10 max-w-[1132px] mx-auto">
          <h1
            className="text-3xl font-bold"
            style={{ color: theme.palette.text.primary }}
          >
            {warehouseId ? `منتجات ${warehouseName}` : "جميع المنتجات"}
          </h1>
          <div className="flex gap-3">
            {warehouseId && (
              <button
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-[#e57d18] transition"
                style={{ backgroundColor: "#FF8E29", color: "#fff" }}
                onClick={() => navigate(`/MonthlyMovement/${warehouseId}`)}
              >
                الحركة الشهرية
              </button>
            )}
            <button
              className="text-sm font-medium py-2 px-4 rounded-md hover:bg-[#e57d18] transition"
              style={{ backgroundColor: "#FF8E29", color: "#fff" }}
              onClick={handleNext}
            >
              إضافة منتج جديد
            </button>
          </div>
        </div>

        {/*  مكون الفلترة */}
        <div className="max-w-[1132px] mx-auto mb-10">
          <FilterBar
            onFilter={(newFilters) => {
              setFilters(newFilters);
              fetchProducts(newFilters);
            }}
          />
        </div>

        {selectedProductId && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            onClick={() => setSelectedProductId(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ProductDetailsCard id={selectedProductId} />
            </div>
          </div>
        )}

        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-6 text-lg">
            لا يوجد منتجات لعرضها في هذا المستودع
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1132px] mx-auto">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="cursor-pointer w-full min-h-[231px] rounded-2xl shadow-md p-4 flex flex-col justify-between transition hover:shadow-lg"
                onClick={() => setSelectedProductId(product.id)}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.background.card1
                      : theme.palette.background.card2,
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="w-[50px] h-[50px] rounded-md overflow-hidden mb-2">
                      <img
                        src="/assets/Product-icon.png"
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: theme.palette.text.primary }}
                    >
                      {product.name}
                    </p>
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {product.code}
                  </span>
                </div>

                <div
                  className="mt-2 text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {product.description}
                </div>

                <hr
                  className="mt-2 mb-1 border"
                  style={{ borderColor: theme.palette.divider }}
                />

                <div
                  className="flex justify-between text-sm font-medium"
                  style={{ color: theme.palette.text.secondary }}
                >
                  <div className="flex flex-col items-start">
                    <span>التاريخ</span>
                    <span>
                      {new Date(product.created_at).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }}
                  className="mt-2 text-xs text-red-600 underline self-start"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
