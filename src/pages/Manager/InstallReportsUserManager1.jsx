import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import InstallUser from "@/components/InstallUser";

export default function InstallReportsUserManager1({ mode, toggleTheme }) {
  const theme = useTheme();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/InstallationReport/${id}/details`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReport(response.data.data);
      } catch (error) {
        console.error("خطأ في جلب بيانات استخدام المستودع:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <p className="min-h-screen w-full bg-[#FFF4EA] p-8 flex items-center justify-center">
        جاري تحميل التفاصيل...
      </p>
    );
  }

  if (!report) {
    return (
      <p className="min-h-screen w-full bg-[#FFF4EA] p-8 flex items-center justify-center">
        لا يوجد تفاصيل لعرضها
      </p>
    );
  }

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="">
      <div
        className="w-full min-h-screen p-8 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        report && <InstallUser report={report} />
      </div>
    </MainLayout>
  );
}
