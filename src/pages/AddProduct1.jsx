import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import ProductDetailsCard from "./ProductDetailsCard";
import Product1 from "../components/Product1";

export default function AddProduct1({ mode, toggleTheme }) {
  const theme = useTheme();
  const { warehouseId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      let url = "/api/products";

      if (warehouseId) {
        url += `?warehouse_id=${warehouseId}`;
      }

      const response = await axios.get(url);
      setProducts(response.data.data.products); // Laravel API returns data inside `data`
    } catch (error) {
      console.error("فشل في جلب المنتجات", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [warehouseId]);

  const handleCardClick = (id) => {
    setSelectedProductId(id);
  };

  const handleCloseOverlay = () => {
    setSelectedProductId(null);
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="اضافة منتج">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div className="flex justify-between items-center mb-10 max-w-[1132px] mx-auto">
          <h1
            className="text-3xl font-bold"
            style={{ color: theme.palette.text.primary }}
          >
            {warehouseId ? `منتجات المستودع (${warehouseId})` : ""}
          </h1>
         
        </div>
            <Product1/>
        {selectedProductId && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
            onClick={handleCloseOverlay}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ProductDetailsCard id={selectedProductId} />
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-lg font-medium mt-10">
            جارٍ التحميل...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1132px] mx-auto">
            {products.map((product, index) => (
              <div
                key={product.id}
                onClick={() => handleCardClick(product.id)}
                className="cursor-pointer w-full min-h-[231px] rounded-2xl shadow-md p-4 flex flex-col justify-between text-right transition hover:shadow-lg"
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.action.hover
                      : theme.palette.background.paper,
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div
                      className="w-[50px] h-[50px] overflow-hidden rounded-md"
                      style={{
                        backgroundColor: theme.palette.action.selected,
                      }}
                    >
                      <img
                        src="/assets/Product-icon.png"
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-[48px] flex items-center">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: theme.palette.text.primary }}
                      >
                        {product.name}
                      </p>
                    </div>
                  </div>
                  <div
                    className="h-[18px] w-[33px] text-xs font-medium"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {product.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
