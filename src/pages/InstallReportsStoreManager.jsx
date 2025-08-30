import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../MainLayout";
import InstallStore from "../components/InstallStore";
import { BASE_URL } from "../api/axiosInstance";

export default function InstallReportsUserManager({ mode, toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/InstallationReport/${id}/details`,
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
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <p style={{ color: theme.palette.text.primary }}>
          جاري تحميل البيانات...
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <p style={{ color: theme.palette.text.primary }}>
          لا يوجد تفاصيل لعرضها
        </p>
      </div>
    );
  }

  const handleApprove = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/installationReport/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Approve response:", response.data);
      alert(response.data.message || "تمت الموافقة بنجاح");
      navigate("/Manager");

      setReport((prev) => ({
        ...prev,
        status: "approved",
      }));
    } catch (error) {
      console.error("خطأ في الموافقة:", error);
      alert("فشل في الموافقة");
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/installationReport/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Reject response:", response.data);
      alert(response.data.message || "تم الرفض بنجاح");
      navigate("/Manager");

      setReport((prev) => ({
        ...prev,
        status: "rejected",
      }));
    } catch (error) {
      console.error("خطأ في الرفض:", error);
      alert("فشل في الرفض");
    }
  };

  return (
    <MainLayout mode={mode} toggleTheme={toggleTheme} pageTitle="">
      <div
        className="w-full min-h-screen p-9 rounded-[20px] mx-auto"
        dir="rtl"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div>
          <div>
            <InstallStore report={report} />
          </div>
          {report.status !== "approved" &&
            (report.status !== "rejected" && (
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
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
