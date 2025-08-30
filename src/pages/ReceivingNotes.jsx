import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
// import ProductDetailsCard from "./ProductDetailsCard";
// import ProductForm from "../components/productform";
import ReceivingNote from "../components/Receiving";
import { BASE_URL } from "../api/axiosInstance";

export default function ReceivingNotes({ mode, toggleTheme }) {
  const theme = useTheme();
  const { id } = useParams(); // ← ناخد id من الرابط
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/receivingNote/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("📌 تفاصيل المذكرة:", response.data);
        setNote(response.data.data);
      } catch (error) {
        console.error("فشل في جلب تفاصيل المذكرة", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        {loading ? (
          <div className="text-center text-lg font-medium mt-10">
            جارٍ التحميل...
          </div>
        ) : (
          note && <ReceivingNote note={note} />
        )}
      </div>
    </MainLayout>
  );
}
