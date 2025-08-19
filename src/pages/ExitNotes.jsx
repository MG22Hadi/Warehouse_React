import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
// import ProductDetailsCard from "./ProductDetailsCard";
// import ProductForm from "../components/productform";
import ExitNote from "../components/Exit";

export default function ExitNotes({ mode, toggleTheme }) {
  const theme = useTheme();
  const { id } = useParams(); // جلب ID من الـ URL
  const [note, setNote] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/ExitNote/${id}/details`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setNote(res.data.data.note); // تفاصيل المذكرة
          setItems(res.data.data.items); // المواد المرتبطة بالمذكرة
        }
      } catch (err) {
        console.error("فشل في جلب مذكرة الإخراج:", err);
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
          note && <ExitNote note={note} />
        )}
      </div>
    </MainLayout>
  );
}
