import { useTheme } from "@mui/material/styles";
import MainLayout from "../MainLayout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Purchase from "../components/Purchase";

export default function PurchaseRequests({ mode, toggleTheme }) {
  const theme = useTheme();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/purchase-requests/show/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("📌 تفاصيل الطلب:", response.data);
        setNote(response.data.data);
      } catch (error) {
        console.error("فشل في جلب تفاصيل الطلب", error);
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
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {loading ? (
          <div className="text-center text-lg font-medium mt-10">
            جارٍ التحميل...
          </div>
        ) : (
          note && <Purchase note={note} />
        )}
      </div>
    </MainLayout>
  );
}
