import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import EntryNote from "../components/Entry";

export default function EntryNotes({ mode, toggleTheme }) {
  const theme = useTheme();
  const { id } = useParams(); // ← ناخد id من الرابط
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/EntryNote/${id}/details`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
          note && <EntryNote note={note} />
        )}
      </div>
    </MainLayout>
  );
}
