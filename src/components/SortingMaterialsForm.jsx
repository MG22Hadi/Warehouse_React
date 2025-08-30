import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { BASE_URL } from "../api/axiosInstance";

export default function SortingMaterialsForm() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [assignQuantity, setAssignQuantity] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unassignedRes = await axios.get(
          `${BASE_URL}/unassigned-items`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const unassignedItems = unassignedRes.data.data;

        const productPromises = unassignedItems.map(async (item) => {
          const productRes = await axios.get(
            `${BASE_URL}/products/show/${item.product_id}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const product = productRes.data.data.product;

          return {
            id: product.id,
            name: product.name,
            code: product.code,
            quantity: item.unassigned_quantity,
            warehouse_id: item.warehouse_id,
            entry_note_id: item.entry_note_id || null,
            receiving_note_id: item.receiving_note_id || null,
          };
        });

        const fullProducts = await Promise.all(productPromises);
        setProducts(fullProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = async (product) => {
    try {
      setSelectedProduct(product);
      setAssignQuantity(1);
      setSelectedLocation(null);

      const res = await axios.post(
        `${BASE_URL}/locations/search-available`,
        {
          warehouse_id: product.warehouse_id,
          product_id: product.id,
          quantity: product.quantity,
          preferred_location_id: null,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLocations(res.data.data);
      console.log("Available locations:", res.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleAssign = async () => {
    if (!selectedLocation || !selectedProduct) return;

    try {
      const type = selectedProduct.entry_note_id ? "entry" : "receiving";

      await axios.post(
        `${BASE_URL}/assign-location`,
        {
          type: type,
          item_id: selectedProduct.id,
          location_id: selectedLocation,
          quantity: assignQuantity,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) =>
        prev
          .map((p) =>
            p.id === selectedProduct.id
              ? { ...p, quantity: p.quantity - assignQuantity }
              : p
          )
          // إزالة المنتجات اللي صارت كميتها صفر
          .filter((p) => p.quantity > 0)
      );
      alert("تم توزيع الكمية على الموقع بنجاح");
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error assigning location:", error);
      alert("حدث خطأ أثناء توزيع الكمية");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-20 justify-start">
        {products.length === 0 ? (
          <div className="no-data-message">
            <p>لا توجد مذكرات بعد</p>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="rounded-xl p-5 shadow-lg w-[300px] flex flex-col justify-between h-[280px]"
              style={{
                backgroundColor:
                  index % 2 === 0
                    ? theme.palette.action.hover
                    : theme.palette.background.paper,
              }}
              dir="rtl"
            >
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

              <span
                className="text-sm font-semibold mb-4"
                style={{ color: theme.palette.text.primary }}
              >
                {product.name}
              </span>

              <span className="text-sm text-gray-400 mb-6">
                الكمية : {product.quantity}
              </span>

              <button
                className="text-[#FF8E29] rounded-xl px-6 py-2 font-bold hover:text-[#e07a1b]"
                onClick={() => openModal(product)}
              >
                فرز المنتج
              </button>
            </div>
          ))
        )}
      </div>

      {/* المودال */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div
            className="bg-white rounded-xl shadow-lg w-[400px] p-6"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
            dir="rtl"
          >
            <h2 className="text-lg font-bold mb-4">توزيع المنتج</h2>

            <label className="block mb-2">اختر الموقع:</label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={selectedLocation || ""}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">-- اختر الموقع --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} (السعة: {loc.capacity_units}, مستخدم:{" "}
                  {loc.used_capacity_units})
                </option>
              ))}
            </select>

            <label className="block mb-2">الكمية:</label>
            <input
              type="number"
              className="w-full border rounded p-2 mb-4"
              min={1}
              max={selectedProduct.quantity}
              value={assignQuantity}
              onChange={(e) => setAssignQuantity(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setSelectedProduct(null)}
              >
                إلغاء
              </button>
              <button
                className="bg-[#FF8E29] text-white px-4 py-2 rounded"
                onClick={handleAssign}
              >
                موافقة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
